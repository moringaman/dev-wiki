
	 
![Ethereum](https://images.duckduckgo.com/iu/?u=https%3A%2F%2Fbitcoinsmart.com%2Fwp-content%2Fuploads%2F2017%2F02%2F1b34ac1216247093242.jpg&f=1)

# Setting Up Your Local Geth Node on Linux

### 1. Installing (Geth) go-ethereum.
&nbsp;

To install geth on ubuntu or debian based systems you can simply run the following commands;
		
		
		sudo apt-get install software-properties-common
		sudo add-apt-repository -y ppa:ethereum/ethereum
		sudo apt-get update
		sudo apt-get install ethereum

[Ethereum installation instructions](https://github.com/ethereum/go-ethereum/wiki/Installation-Instructions-for-Ubuntu)
&nbsp;



### 2. Running Puppeth to Create your Genesis block
&nbsp;

Next you will need to run puppeth which will create your genesis or initial block for your own local ethereum blockchain

1. Create a directory into which you wouldlike geth to store accounts and configuration files and from inside that directory run `` puppeth ``
		
	1. Enter your desired network name (choose any name that is not reserved).
	2. what would you like to do > choose option 2 (Configure new genesis).
	3. Choose option 1 which is a poof of work consensus engine.
	4. Skip the next option regarding funding of accounts and then type your network id (not a reserved one such as robsten or rinkeby)
	5. You ca skip the 'fun' question and then select 2 for manage existing genesis and 2 again to export it.
	6. Accept the dafault json file to export the genesis block information to.


2. Whilst still in our project directory we need to run a command inorder to initialize our genesis block, run the below command to accomplish this;

	`` geth --datadir . init yourjasonfile.json ``


3. Once completed yuo will see two new folders **geth** and **keystore** which means that we are ready to create our initial accounts. This can be done by running:

	`` geth --datadir . account new ``

4. After you have created the number of accounts you want you can list them by typing

	`` get --datadir . account list ``

5. Next we nee to create bash script containing the commands and parameters needed to run our geth node each time we need to. We will call it startNode.sh and it will contain;


`` geth --networkid 4224 --mine --minerthreads 2 --datadir "." --nodiscover --rpc --rpcport "8545" --port "30303" --rpccorsdomain "*" -nat "any" --rpcapi eth,web3,personal,net --unlock 0 --password ./password.sec  --ipcpath "~/.ethereum/geth.ipc" ``

6. We also need to create a password.sec file in which we will store our password & we need to make our bash script executable with `` sudo chmod a+x startNode.sh ``

7. Now we can start our node by running our startNode.sh script with the following command `` ./startNode.sh ``

8. Once our node is up and running we can use the `` geth attach `` command to connect a console session to our node.

### Some Useful Commands:

| Command | Usage |
|---------|--------|
|``eth.accounts``| List all addresses of the accounts on the node|
|``eth.coinbase``| Displays the address of the coinbase account|
|``eth.getBalance(eth.coinbase)``| Shows the balance in wei of the coinbase account|
|``web3.fromWei(eth.getBalance(eth.coinbase), "ether")``| Shows tha balance of the coinbase account in Ether|
|``web3.fromWei(eth.getBalance(eth.accounts[1]), "ether")``| Shows the balance of account 1 in ether|
|``miner.stop()``| Stops the mining process|
|``net.version``| Provides the network ID of our node|
|``personal.unlockAccount(eth.accounts[1], "password", 300)``| Unlocks our account for transactions for 5mins|
|``personal.unlockAccount(eth.accounts[1])``| Unlocks account 1 for transactions prompts for password |
|``eth.sendTransaction({from: eth.coinbase, to: eth.accounts[2], value: web3.toWei(10, "ether")})``| Transfers 10 ether from the coinbase to account 2 |

[You can find more information and cli commands my reading the docs on the go-ethereum gitub pages, here](https://github.com/ethereum/go-ethereum/wiki/JavaScript-Console)
