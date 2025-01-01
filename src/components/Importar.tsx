import { Button } from "@nextui-org/react"
import { ChangeEvent, useRef, useState } from "react";
import { Account } from "../types";
import { useToast } from "@chakra-ui/react";

type Props = {
    showImport: boolean
    setAccount: (account:Account) => void
}
export const Importar:React.FC<Props> = ({showImport, setAccount}) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [loading,setLoading] = useState(false)
    const toast = useToast()

    const readFile = (e:ChangeEvent<HTMLInputElement>) => {
        setLoading(true)
        if(!e.target.files) return;
        const file:File|null = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsText(file,'text/plain;charset= utf-8');
        fileReader.onloadend = () => {      
            if(typeof fileReader.result === 'string' )
            {
                const blob = new Blob([fileReader.result],{ type: 'text/plain;charset= utf-8' })      
                blob.text().then(res => {
                        let newAccount:Account = JSON.parse(res)
                        setLoading(false)
                        setAccount(newAccount)            
                    }).catch(() => {
                    setLoading(false)
                    toast({
                        title: 'Warning',
                        description: "The provided file is not compatible",
                        status: 'error',
                        duration: 5000,
                        isClosable: true
                    })
                })
            }
        }
    }
    return(<>
        <div className={showImport ? 'mb-4' : 'mb-4 hidden'} >
            <div className="grid justify-items-center p-3 gap-3" >
                <div className="font font-semibold">Import wallet (.pk) <span className="font text-red-700">*</span></div> 
                <input hidden type="file" ref={fileInputRef} multiple={false} onChange={ readFile }/>
                <Button className="btn-gradient text-white" isLoading={loading}
                    onClick={() => fileInputRef.current?.click()}>Import </Button>
            </div>
            <div className="grid justify-items-center gap-3">
                <div className="font font-mono">"Do not share your ptivate key or seedphrase with anyone."</div>    
            </div>
        </div>
    </>)
}
