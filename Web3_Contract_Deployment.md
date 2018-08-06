
![Solidity Logo](https://s3.amazonaws.com/thinkific-import/104829/solidity-1520540026519.png)

# Deploying A Solidity Contract Without Truffle



1. Start a Node session in the console and import web3 with

   ​

```js
Web3 = require('web3');
```

2. Next instantiate a new Web3 instance and pass in your local ganach instance as your http provider whith;

```js
	we3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545"))
```

3. At this point typing * web3.eth.accounts * should yield your 10 ganache ethereum accounts.

4. Next we need to load our solidity compiler solc with `` solc = require('solc') ``

5. Now we load the source code of our contract and save it to a variable called * sourceCode * by typing:

```js
	sourceCode = fs.readFileSync('greetings.sol').toString()
```

6. Now that we have loaded our source code we can compile it with our solidity compiler and save it as
  variable compiledCode.

```js
	compiledCode = solc.compile(sourceCode)
```

7. In order to deploy our newly compiled contract we need to first extract the contract ABI from the
  contract interface:

```js
	contractABI = JSON.parse(compiledCode.contracts[':Greetings'].interface)
```

8. To deploy our contract we need to create a contract factory called greetingsContract and pass it our
  contractABI code with:

```js
	greetingsContract = web3.eth.contract(contractABI)
```

9. We also need to extract the bytcode from our previously compiled code with:

```js
	byteCode = compiledCode.contracts[':Greetings'].bytecode
```

10. Now we an deploy our contact we need to send some our bytcode data to our greetingsContract facctory
  with the following:

```js
	greetingsDeployed = greetingsContract.new({data:byteCode, from: web3.eth.accounts[0], gas: 4700000})
```

11. Finally and in order to interact with our contract we need to create an instance of it by typing;

```js
	greetingsInstance = greetingsContract.at(greetingsDeployed.address)
```

