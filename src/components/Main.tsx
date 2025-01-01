import { SettingsIcon } from "@chakra-ui/icons";
import { useAccount } from "../store/useAccount";
import { AccountData } from "./AccountData";
import { Navigate } from "react-router-dom";
import { Button, Card, CardHeader, CardBody, CardFooter, Link, Spinner } from "@nextui-org/react";
import { FooterPending } from "./FooterPending";
import { usePending } from "../store/usePending";

export const Main = () => {
  const {account} = useAccount()
  const {pending} = usePending()
  return(
  <>
    { !account && <Navigate to='/setup'/>}
      <div className="grid">
        <Card className="p-3">
          <CardHeader className="flex justify-between justify-items-center gap-3">
              <div className="font font-bold text-2xl">
                Wallet Info
              </div>
              <div className="flex justify-center justify-items-center">
                {/* Notificaciones */}
                <Button className="rounded-full bg-gradient-to-tr from-violet-700 to-cyan-500 text-white" as={Link} href="/setting" isIconOnly>
                  <SettingsIcon/>
                </Button>
                {/* Notificaciones */}
              </div>
          </CardHeader>
          <CardBody>
            <AccountData/>
          </CardBody>
          <CardFooter className="flex justify-end p-3">
            <Button 
              isIconOnly 
              className="bg-gradient-to-tr from-orange-500 to-red-500 text-white text-tiny" 
              onClick={() => window.location.href = "https://t.me/TrigonEVM"}
              aria-label="Open Chat"
              >
              💬
            </Button> 
          </CardFooter>
        </Card>
      </div>
      { pending !== 0 &&
        <FooterPending> 
          <p className='text text-sm font-bold'>{pending} Transferencia(s)</p>
          <p className='text text-sm font-bold'>Pendiente(s)</p><Spinner size='sm'/>
        </FooterPending>}
    </>
  );
}
