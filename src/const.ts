import { RPC } from "./types";


export const defaultRPC:RPC = { name: 'Trigon Main RPC' , url: 'https://rpc.trigonevm.space' }

export const defaultRPCs:RPC[] = [{ name: 'Trigon Main RPC' , url: 'https://rpc.trigonevm.space' },
{ name: 'Trigon Thirdweb', url: 'https://929.rpc.thirdweb.com'}]

export const Default_MIN_Unlock = 15

export const ViewConfigPage = {
    INDEX : 'INDEX',
    RPC : 'RPC',
    EXPORT : 'EXPORT'
}

export const hexRegex = /^[0-9A-Fa-f]/;

export const ABI = [
    {"inputs":[{"internalType":"string","name":"name_","type":"string"},
    {"internalType":"string","name":"symbol_","type":"string"},
    {"internalType":"uint8","name":"decimals_","type":"uint8"}],
    "stateMutability":"nonpayable","type":"constructor"},
    {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},
    {"indexed":true,"internalType":"address","name":"spender","type":"address"},
    {"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],
    "name":"Approval","type":"event"},
    {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},
    {"indexed":true,"internalType":"address","name":"to","type":"address"},
    {"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],
    "name":"Transfer","type":"event"},
    {"inputs":[{"internalType":"address","name":"owner","type":"address"},
    {"internalType":"address","name":"spender","type":"address"}],
    "name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],
    "stateMutability":"view","type":"function"},
    {"inputs":[{"internalType":"address","name":"spender","type":"address"},
    {"internalType":"uint256","name":"amount","type":"uint256"}],
    "name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],
    "stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"internalType":"address","name":"account","type":"address"}],
    "name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],
    "stateMutability":"view","type":"function"},
    {"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],
    "stateMutability":"view","type":"function"},
    {"inputs":[{"internalType":"address","name":"spender","type":"address"},
    {"internalType":"uint256","name":"subtractedValue","type":"uint256"}],
    "name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],
    "stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"internalType":"address","name":"spender","type":"address"},
    {"internalType":"uint256","name":"addedValue","type":"uint256"}],
    "name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],
    "stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"internalType":"address","name":"to","type":"address"},
    {"internalType":"uint256","name":"value","type":"uint256"}],
    "name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],
    "stateMutability":"nonpayable","type":"function"},
    {"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],
    "stateMutability":"view","type":"function"},
    {"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],
    "stateMutability":"view","type":"function"},
    {"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],
    "stateMutability":"view","type":"function"},
    {"inputs":[{"internalType":"address","name":"to","type":"address"},
    {"internalType":"uint256","name":"amount","type":"uint256"}],
    "name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],
    "stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"internalType":"address","name":"from","type":"address"},
    {"internalType":"address","name":"to","type":"address"},
    {"internalType":"uint256","name":"amount","type":"uint256"}],
    "name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],
    "stateMutability":"nonpayable","type":"function"}]
