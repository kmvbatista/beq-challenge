// dataStorage.ts
import crypto from 'crypto';
import Blockchain from './blockchain';

class DataStorage {
  blockchain: Blockchain;
  private db: { [key: string]: string };

  constructor() {
    this.blockchain = new Blockchain();
    this.db = {};
  }

  storeData(userId: string, data: string): void {
    const dataHash = crypto.createHash('sha256').update(data).digest('hex');
    this.blockchain.newTransaction(userId, dataHash);
    this._storeDataInDb(userId, data);
  }

  private _storeDataInDb(userId: string, data: string): void {
    this.db[userId] = data;
  }

  verifyData(userId: string, data: string): boolean {
    const dataHash = crypto.createHash('sha256').update(data).digest('hex');
    const storedTransactions = this.blockchain.chain
      .flatMap(block => block.transactions)
      .filter(tx => tx.userId === userId);
      if(storedTransactions.length) {
        const lastTransaction = storedTransactions[storedTransactions.length - 1]
         return lastTransaction !== undefined && dataHash === lastTransaction.hash;
      }
    return false
  }

  getData(userId: string) {
    return this.db[userId] || ''
  }
}

export default DataStorage;
