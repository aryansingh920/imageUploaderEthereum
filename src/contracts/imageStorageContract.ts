// imageStorageContract.ts
import Web3 from 'web3';
import * as ImageStorageJSON from '../../build/contracts/ImageStorage.json';




export class ImageStorageContract {
  private contractAddress: string;
  private contract: any;
  private web3: Web3;

  constructor(contractAddress: string) {
    this.contractAddress = contractAddress;
    this.web3 = new Web3('http://localhost:7545'); // Replace with the Ganache HTTP provider URL
    this.contract = new this.web3.eth.Contract(ImageStorageJSON.abi, this.contractAddress);
  }

  async storeImageHash(fileName: string, hash: string): Promise<void> {
    const accounts = await this.web3.eth.getAccounts();
    const sender = accounts[0];

    await this.contract.methods.storeImageHash(fileName, hash).send({ from: sender });
  }

  async getImageHash(fileName: string): Promise<string> {
    return await this.contract.methods.getImageHash(fileName).call();
  }
}
