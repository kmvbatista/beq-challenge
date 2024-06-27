// blockchain.ts
import crypto from 'crypto';

interface Transaction {
  userId: string;
  hash: string;
}

interface Block {
  index: number;
  timestamp: number;
  transactions: Transaction[];
  proof: number;
  previousHash: string;
}

class Blockchain {
  chain: Block[];
  currentTransactions: Transaction[];

  constructor() {
    this.chain = [];
    this.currentTransactions = [];
    this.newBlock(100, '1'); // Genesis block
  }

  newBlock(proof: number, previousHash: string): Block {
    const block: Block = {
      index: this.chain.length + 1,
      timestamp: Date.now(),
      transactions: this.currentTransactions,
      proof,
      previousHash,
    };

    this.currentTransactions = [];
    this.chain.push(block);
    return block;
  }

  newTransaction(userId: string, hash: string): void {
    this.currentTransactions.push({ userId, hash });
    const lastBlock = this.lastBlock();
    const lastProof = lastBlock.proof;
    const proof = this.proofOfWork(lastProof);
    this.newBlock(proof, this.hash(lastBlock));
  }

  hash(block: Block): string {
    const blockString = JSON.stringify(block);
    return crypto.createHash('sha256').update(blockString).digest('hex');
  }

  lastBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  proofOfWork(lastProof: number): number {
    let proof = 0;
    while (!this.validProof(lastProof, proof)) {
      proof += 1;
    }
    return proof;
  }

  validProof(lastProof: number, proof: number): boolean {
    const guess = `${lastProof}${proof}`;
    const guessHash = crypto.createHash('sha256').update(guess).digest('hex');
    return guessHash.startsWith('0000'); // Example difficulty
  }
}

export default Blockchain;
