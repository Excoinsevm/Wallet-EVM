import { useState} from "react";
import { useAccount } from "../store/useAccount.js";
import { Card,CardHeader, CardBody, Link, Button } from "@nextui-org/react";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { Navigate } from "react-router-dom";
import { Importar } from "./Importar.js";

export const Init = () => {
    const {account, setAccount} = useAccount()
    const [showImport,setShowImport] = useState(false);       
    
    return(
        <>
        {account && <Navigate to='/'/>}
        <Card className="max-w-[400px]">
            <CardHeader className="grid justify-items-center">
                <h1 className="text-4xl text-orange-900 m-5">
                    Trigon Wallet
                </h1>
                <h2 className="text text-wrap text-lg font-serif ml-10 mr-10">
                    Create a Trigon wallet quick and easy
                </h2>
            </CardHeader>            
            <CardBody className="flex justify-items-center">
                <div className="grid grid-cols-2 justify-center justify-items-center gap-3">
                    <div className="grid m-5 justify-items-center">
                        <Button isIconOnly as={Link} href="/setup" size="lg" 
                            className="btn-gradient text-white">
                            <LibraryAddIcon/>
                        </Button>
                        <div className="text text-justify font-serif">Create new wallet</div>
                    </div>
                    <div className="grid m-5 justify-items-center">
                        <Button as={Link} size='lg' isIconOnly
                            className="btn-gradient text-white" 
                            onClick={() => setShowImport(true)} ><SystemUpdateAltIcon/> </Button>
                        <div className="text text-center font-serif mt-3">Import wallet</div>                        
                    </div>
                </div>
                <Importar showImport={showImport} setAccount={setAccount}/>
            </CardBody>     
        </Card>
    </>
    ); 
}
