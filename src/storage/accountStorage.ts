import { Account, IHasPassword } from "../types"

export const GetAccount = ():Account|null => {
    const secret = localStorage.getItem('account')
    let result: Account | null = (secret) ? JSON.parse(secret) : null
    const fecha = new Date();
    if(result)
    {
        if (fecha.getTime() - result.hasPass.fecha > (15*60 * 1000)) { 
            result.hasPass.value = false
            return result;
          }
    } 
    return null
}
export const SaveAccount = (account: Account|null) => {
    let newAccount = structuredClone(account)
    if(newAccount)
    {
        const fecha = new Date();
        const data : IHasPassword = { value : true , fecha : fecha.getTime() }
        newAccount.hasPass = data 
        localStorage.setItem('account',JSON.stringify(newAccount))
        return true
    }
    localStorage.removeItem('account')
    return false
}
export const ClearAccount = () => {
    localStorage.removeItem('account')
    return null
}