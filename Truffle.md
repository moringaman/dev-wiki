
![TRUFFLE](http://truffleframework.com/docs/img/logo.png)


## Deploying your contract with truffle
&nbsp;
1. Write a deployment script as follows

```js

var Greetings = artifacts.require("./Greetings.sol");

module.exports = function(deployer) {
  deployer.deploy(Greetings);
};

```

2. Run ``js truffle develop `` from your project root to start the truffle server instance

3. Run ``js truffle develop --log `` to connect to the server instance 

4. At the truffle command prompt run ``js truffle migrate --compile-all --reset `` this will compile and deploy a fresh version of our contracts.

5. In order to interact with our deployed contract we need to run `` Greetings.deployed().then(function(instance){app = instance}) `` \
to create an instance of it which we store in the app global variable.

6. Our contract instance *app* can now be referenced directly and we can call functions using app.getGreeting() for example

&nbsp;

![Ganache](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmhtp19Rs0RN5KzpiINCkHJy6sI_zPK_CnDthRxCnnnYW1u4DAew)
## Migrating your contracts to the Ganache network

&nbsp;

You may whant to migrate your contracts over to the Ganache network in order to interact with them using the ganache Gui.
This is pretty simple with the truffle framework and involves adding the Ganach network to your truffle config.

1. Add the following to you truffle js file:

	```js
	
	module.exports = {
	  networks: {
	    ganache: {
	      host: "localhost",
	      port: 7545,
	      network_id: "*"
	    }
	  }
	};

	```
2. Next we need to run truffle migrate to compile and deploy our contracts to the newly added Ganache network with the following command

	`` truffle migrate --compile-all --reset --network ganache ``

3. In order to interact with our contracts we first need to run `` truffle console --network ganache `` then create an instance of our deployed contract and make it equal to a variable (in this case app).

	```js
	
	Greetings.deployed().then(function(instance){app = instance};) 
	
	```
4. Now we can call functions on our contracts with commands like:

	`` app.getGreeting() ``

	or to set the greeting

	`` app.setGreeting("My new greeting", {from: web3.eth.accounts[0]}) ``

