import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@nextui-org/react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ClearIcon from '@mui/icons-material/Clear';
import { ModalAddToken } from "./ModalAddToken";
import { ModalSend } from "./ModalSend";
import { useEffect, useState } from "react";
import { Token } from "../types";
import { useAccount } from "../store/useAccount";
import { useRPC } from "../store/useRPC";
import { ethers } from "ethers";
import { ABI } from "../const";
import { getTokenBalance } from "../services/accountService";
import { Navigate } from "react-router-dom";
import { usePending } from "../store/usePending";

export const TableToken: React.FC = () => {
  const { account } = useAccount();
  const { pending } = usePending();
  const { defaultRPC, rpcs, addToken, updateTokenBalance, removeToken } = useRPC();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenSend, onOpen: onOpenSend, onClose: onCloseSend } = useDisclosure();
  const [token, setToken] = useState<Token>();
  const [fetchedTokenList, setFetchedTokenList] = useState<Token[]>([]);

  // Fetch tokens from the external link
  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await fetch("https://unpkg.com/@trigonevm/token-list@latest");
        const tokens: Token[] = await response.json();
        setFetchedTokenList(tokens);
      } catch (error) {
        console.error("Error fetching tokens:", error);
      }
    };
    fetchTokens();
  }, []);

  useEffect(() => {
    fetchedTokenList.forEach(async (token) => {
      try {
        let balance = await getTokenBalance(rpcs[defaultRPC], token.address, account?.keystore.address);
        token.balance = balance;
        let newToken = structuredClone(token);
        newToken.balance = balance;
        updateTokenBalance(newToken);
      } catch (error) {
        console.error(`Error getting balance for ${token.address}:`, error);
      }
    });
  }, [account, defaultRPC, pending, fetchedTokenList]);

  useEffect(() => {
    if (fetchedTokenList.length === 0) return;
    let rpc = rpcs[defaultRPC];
    const provider = new ethers.JsonRpcProvider(rpcs[defaultRPC].url);

    fetchedTokenList.forEach(async (token) => {
      try {
        const contract = new ethers.Contract(token.address, ABI, provider);
        const transferEvent = contract.filters.Transfer();
        contract.addListener(transferEvent, async () => {
          let balance = await getTokenBalance(rpc, token.address, account?.keystore.address);
          token.balance = balance;
          let newToken = structuredClone(token);
          newToken.balance = balance;
          updateTokenBalance(newToken);
        });
      } catch (error) {
        console.error(`Error creating contract instance for ${token.address}:`, error);
      }
    });

    return () => {
      fetchedTokenList.forEach((token) => {
        const contract = new ethers.Contract(token.address, ABI, provider);
        const transferEvent = contract.filters.Transfer();
        contract.removeAllListeners(transferEvent);
      });
    };
  }, [defaultRPC, rpcs, fetchedTokenList, account]);

  return (
    <>
      {account && <Navigate to="/" />}
      <Table
        aria-label="token list"
        bottomContent={
          <div className="flex justify-center p-3">
            <Button
              isIconOnly
              onClick={onOpen}
              className="rounded-full bg-gradient-to-tr from-violet-700 to-cyan-500 text-white"
            >
              <AddCircleOutlineIcon />
            </Button>
            <ModalAddToken isOpen={isOpen} onClose={onClose} addToken={addToken} />
            {token && account && (
              <ModalSend isOpen={isOpenSend} onClose={onCloseSend} token={token} account={account} />
            )}
          </div>
        }
      >
        <TableHeader>
          <TableColumn>Token</TableColumn>
          <TableColumn>Amount</TableColumn>
          <TableColumn>Logo</TableColumn>
          <TableColumn>Send</TableColumn>
          <TableColumn>Remove</TableColumn>
        </TableHeader>
        <TableBody>
          {fetchedTokenList.map((element, key) => (
            <TableRow key={element.address}>
              <TableCell>{element.symbol}</TableCell>
              <TableCell width={300}>
                {ethers.formatUnits(element.balance, element.decimals)}
              </TableCell>
              <TableCell>
                <img src={element.logoURI} alt={element.name} width={32} height={32} />
              </TableCell>
              <TableCell>
                <Button
                  isIconOnly
                  className="bg-foreground-20"
                  onClick={() => {
                    setToken(element);
                    onOpenSend();
                  }}
                >
                  <KeyboardDoubleArrowRightIcon className="text-blue-900" />
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  isIconOnly
                  className="bg-foreground-20"
                  onClick={() => {
                    removeToken(key);
                  }}
                >
                  <ClearIcon className="text-red-700" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
