import { BigNumber, ethers, utils } from "ethers";
import * as BasicCounterInterface from "../build/contracts/BasicCounter.json";

/// BasicCounter app class
class BasicCounter {
    private _contrAddr : string;
    private _contrABI : ethers.ContractInterface;
    private _provider : ethers.providers.JsonRpcProvider;
    private _contrInstance : ethers.Contract;
    private _contrInstanceWithSigner : ethers.Contract;
    private _jsonRPCProviderURL : string;
    private _signer : ethers.Signer;
    private _accounts : string[];

    constructor(contractAddress : string, contractABI : ethers.ContractInterface, jsonRpcProviderURL : string) {
        this._contrAddr = contractAddress;
        this._contrABI = contractABI;
        this._jsonRPCProviderURL = jsonRpcProviderURL;
    }

    /// init and return the address of the contract
    async init() : Promise<object> {
        this._provider = new ethers.providers.JsonRpcProvider(this._jsonRPCProviderURL); // create provider;
        this._contrInstance = new ethers.Contract(this._contrAddr, this._contrABI, this._provider); // create contract

        this._accounts = await this._provider.listAccounts();
        this._signer = this._provider.getSigner(
            this._accounts[0] // set first account as initial account but can be changed
        )

        this._contrInstanceWithSigner = this._contrInstance.connect(this._signer); // connect signer

        return {
            accounts: this._accounts,
            address: this._contrInstance.address,
            interface: this._contrInstance.interface
        }
    }

    async increase() : Promise<number> {
        return this._contrInstanceWithSigner.increase().then(async (response : ethers.providers.TransactionResponse) => {
            return response.wait().then((receipt : ethers.providers.TransactionReceipt) => {
                return BigNumber.from(receipt.logs[0].data).toNumber(); 
            })
        }).catch(err => {
            console.error("Error occured: ", err)
        })
    }

    async decrease() : Promise<number> {
        return this._contrInstanceWithSigner.decrease().then(async (response : ethers.providers.TransactionResponse) => {
            return response.wait().then((receipt : ethers.providers.TransactionReceipt) => {
                return BigNumber.from(receipt.logs[0].data).toNumber();
            })
        }).catch(err => {
            console.error("Error occured: ", err);
        })
    }

    async currentValue() : Promise<number> {
        return this._contrInstance.get().then((value : number) => {
            return value;
        }).catch(err => {
            console.error("Error occured: ", err);
        })
    }

    async reset() : Promise<number> {
        return this._contrInstanceWithSigner.reset().then(async (response : ethers.providers.TransactionResponse) => {
            return response.wait().then((receipt : ethers.providers.TransactionReceipt) => {
                return BigNumber.from(receipt.logs[0].data).toNumber();
            })
        }).catch(err => {
            console.error("Error occured: ", err);
        })
    }
}

/// Usage
async function main() {
    const counter = new BasicCounter(
        "0xb92B99056387896b42e5513E51B317D072AEfEcb", // goerli testnet
        //"0x60534366D999b234b5280a62D388def4b04EA3f9", // ganache
        BasicCounterInterface.abi, 
        "http://127.0.0.1:7545");
    
    await counter.init() // init

    // increase counter;
    console.log(await counter.decrease());
}

main();

