# BlockChainjs
## How to code a blockchain in javascript


### Our Blockchain class

We will code out our javascript blockchain as a class called Blockchain with an initial constructor
which specifies two arrays. The first will contain our blocks and the other pending transactions until they are added to new blocks a they are mined.

```js

class Blockchain {
	constructor() {
	this.chain = []; // to contain an array of blocks
	this.pendingTransactions = []
	}
}
```

### The createNewBlock function


In order to create our first block we need to create a function which inherits our blockchain classes methods and properties to do this we use prototypes.

```js
Blockchain.prototype.createNewBlock = function (nonce, previousBlockHash, hash) {
	const newBlock = {
		index: this.chain.lenght + 1,
		timestamp: Date.now(),
		transactions: this.pendingTransactions,
		nonce: nonce,
		hash: hash,
		previousHash: previousBlockHash
	}
	this.pendingTransactions = []
	this.chain.push(newBlock);
	
	return newBlock;
}
```
Our newBlock object contains all the information we need for each block some refer to our previous block and the transactions contained in our block are taken from the pendingtransactions array. We then empty the pending transactions and push our new block onto our chain (array of block objects)

creatNew block takes three variables nonce, hash and previousBlockHash


### The getLastBlock function

In order to privide our createNewBlock function with the previous blocks hash we need to get the previous block in our chain array/
this would be the last index - 1 (see code below)

```js
Blockchain.prototype.getLastBlock = function () {
	return this.chain[this.chain.length - 1];
};
```

### Creating New Transactions

We also need a way to create new transactions which can record funds transfers from one wallet to another/
this function will then be pushed onto the pendingTransactions array of our chain prior to being mined/
and placed into the transactions array of a newBlocks.

```js
Blockchain.prototype.createNewTransaction = function (amount, sender, recipient) {
	const newTransaction = {
		amount: amount,
		sender: sender,
		recipient: recipient
	}
	
	this.chain.pendingTransactions.push(newTransaction)
	return this.getLastBlock()["index"] + 1;
}
```

we also call getLastBlock to find the lastblock index and then add 1 to it so that we can report back the/
block number or (index) of where the transction will be created.

## Hashing and Proof of Work

### Hashing with sha256 Encryption

In order to encrypt our blockchain in order to prevent it from being hacked and altered we will be hashing each of our blocks as well as running a proof of work/
algorithm in order to prove it's data integrity. First we introduce the hasBlock function which simply takes in three params concatinates them into a string/
and then hashes the result.

Our 3 parameters are previousBlockHash, currentBlockData and nonce..

```js
Blockchain.prototype.hashBlock = function (previousBlockHash, currentBlockData, nonce) {
const blockData = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
	const hash = sha256(blockData);
	return hash;
}
```
### The proofOfWork() Function

We now need to create a way to ensure the integrity of our blockchain, now to do this we are going to try to always generate a hash value begging with 0000/
Givern that we already know what our hashBlock method requires to create a hash we need to generate a nonce which will result in a correct hash given the
prevousBlockHash and currentBlockData, which cannot be changed.

We have to do this through trial and error passing our currentBlockData and previousBlockHash to sha256 whilst at the same time incrementing our nonce value from/
0 upwards until the resulting hash starts with 0000. To do this we will use a simple while loop.

```js
Blockchain.prototype.proofOfWork = function (previousBlockHash, currentBlockData) {
	const nonce = 0
	let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce) 
	while (hash.substring(0,4) !== "0000") {
	nonce++
	hash = this.hashBlock(previousBlockHash, currentBlockData, nonce)
	}
	
	return nonce;
}
```
Finally we return our nonce value as this is what we will use whenever we hash a new block as part of out mining process.


