# Crypto Zombies Game contracts documented


### ZombieFactory - contract
#### Our first contract creates zombies by taking a name passed as a string then using a hash function to create a dna string. The name of the zombie and it's dna is added to an array of zombie structs called zombies.
#### Once our zombie is created an event is fired returning our new zombies name, id and DNA.

```js
pragma solidity ^0.4.19;

contract ZombieFactory {

    // declare our event here events tell return data upon being called
    
        event NewZombie(uint zombieId, string name, uint dna);
    
    // declare variables for dna creation calcullations
    
    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;
		
    struct Zombie {
        string name;
        uint dna;
        }
					
    Zombie[] public zombies;
    
	// create mappings to map zombie if to accounts & one for accounts to zombie counts;
	
        mapping(uint => address) public zombieToOwner;
	mapping(address => uint) ownerZombieCount;
    
	// private function takes name and dna and pushes the zombie to the zombies array
	
    function _createZombie(string _name, uint _dna) private {
    uint id = zombies.push(Zombie(_name, _dna)) - 1;
    
	// assign the id of the new zombie to our users account
	
        zombieToOwner[id] = msg.sender;
	
	// update the users zombie count by 1
	
		ownerZombieCount[msg.sender]++;
		NewZombie(id, _name, _dna);
		
        // fire event here
	
     NewZombie(id,_name, _dna);
    } 
    
	// generate dna for new zombie using keccack256 and a string								    
	
    function _generateRandomDna(string _str) private view returns (uint) {
        uint rand = uint(keccak256(_str));
        return rand % dnaModulus;
    }
    
	// create zombie by calling create zombie function and passing it dna												    
	
     function createRandomZombie(string _name) public {
	
        // Make sure that the the user doesn't have a zombie already
	
     require(ownerZombieCount[msg.sender] == 0);
        uint randDna = _generateRandomDna(_name);
        _createZombie(_name, randDna);
    }
							    
    }
```

### The Zombie Feeding Contract

#### This contract inherits all the public methods within the ZombieFactory contract as is it declared as a child of the former with.

```js
pragma solidity ^0.4.19;
import "./zombiefactory.sol";

contract ZombieFeeding is Zombiefactory {

}
```

#### The Zombie factory contract is also invoked within the ZombieFeeding contract with an import statement

#### Our first function called feedAndMultiply first uses a require statement to make sure that the message sender is the owner of the zombie at the zombieId index of our ownerToZombie mapping. If so we then store a pointer to that zombie from our zombies array into a variable called myZombie.


```js
function feedAndMultiply(uint _zombieId, uint _targetDna) public {

// require statement to mage sure msg.sender owns the zombie 

	 require(msg.sender == zombieToOwner[_zombieId]);
         Zombie storage myZombie = zombies[_zombieId];
	 
	    // make sure dna is restricted to 16 characters
	    
	_targetDna = _targetDna % dnaModulus;
    uint newDna = (myZombie.dna + _targetDna) / 2;
	_createZombie("NoName", newDna);
			  }
}
```

#### Our new Zombies DNA is created by finding the average ofthe zombie and victims dna and create new zombie from our zombiefactory.sol contract is called by passing a name for our zombie along with the newly created zombie DNA.

### Interfacing with Other Blockchain contracts

#### For our contract to talk to another contract on the blockchain that we don't own, first we need to define an interface. This mirrors the public view function from another contract on the bloack chain except it only has the function declaration and return values with no curly braces.

####  we're not defining the function bodies. Instead of curly braces ({ and }), we're simply ending the function declaration with a semi-colon (;).

```js

contract kittyInterface {
  function getKitty(uint256 _id) external view returns(
	  bool isGestating,
          bool isReady,
	  uint256 cooldownIndex,
          uint256 nextActionAt,
	  uint256 siringWithId,
	  uint256 birthTime,
	  uint256 matronId,
	  uint256 sireId,
	  uint256 generation,
	  uint256 genes
	          );
}

```)
#### Next we declare our interface to the external contract as follows.

```js
  address ckAddress = 0x06012c8cf97BEaD5deAe237070F9587f8E7A266d;
    // Initialize kittyContract here using `ckAddress` from above
      KittyInterface kittyContract = KittyInterface(ckAddress);
```

#### The following function retreives the values from the cryptoKitties contract then passes the zomble id and the kittyDna to the feed and multiply function.

```js

  function feedOnKitty(uint _zombieId, uint _kittyId) public {
        uint kittyDna;
	      (,,,,,,,,,kittyDna) = kittyContract.getKitty(_kittyId);
	            feedAndMultiply(_zombieId, kittyDna);
		        };
```

### Advanced Solidity Concepts

#### Immutability of Contracts

Up until now, Solidity has looked quite similar to other languages like JavaScript. But there are a number of ways that Ethereum DApps are actually quite different from normal applications.

To start with, after you deploy a contract to Ethereum, it’s immutable, which means that it can never be modified or updated again.

The initial code you deploy to a contract is there to stay, permanently, on the blockchain. This is one reason security is such a huge concern in Solidity. If there's a flaw in your contract code, there's no way for you to patch it later. You would have to tell your users to start using a different smart contract address that has the fix.

But this is also a feature of smart contracts. The code is law. If you read the code of a smart contract and verify it, you can be sure that every time you call a function it's going to do exactly what the code says it will do. No one can later change that function and give you unexpected results.


#### External Dependencies

we hard-coded the CryptoKitties contract address into our DApp. But what would happen if the CryptoKitties contract had a bug and someone destroyed all the kitties?

It's unlikely, but if this did happen it would render our DApp completely useless — our DApp would point to a hardcoded address that no longer returned any kitties. Our zombies would be unable to feed on kitties, and we'd be unable to modify our contract to fix it.

For this reason, it often makes sense to have functions that will allow you to update key portions of the DApp.

For example, instead of hard coding the CryptoKitties contract address into our DApp, we should probably have a setKittyContractAddress function that lets us change this address in the future in case something happens to the CryptoKitties contract

#### Time Units

Solidity provides some native units for dealing with time.

The variable now will return the current unix timestamp of the latest block (the number of seconds that have passed since January 1st 1970). The unix time as I write this is 1515527488.

Note: Unix time is traditionally stored in a 32-bit number. This will lead to the "Year 2038" problem, when 32-bit unix timestamps will overflow and break a lot of legacy systems. So if we wanted our DApp to keep running 20 years from now, we could use a 64-bit number instead — but our users would have to spend more gas to use our DApp in the meantime. Design decisions!
    
Solidity also contains the time units seconds, minutes, hours, days, weeks and years. These will convert to a uint of the number of seconds in that length of time. So 1 minutes is 60, 1 hours is 3600 (60 seconds x 60 minutes), 1 days is 86400 (24 hours x 60 minutes x 60 seconds), etc.
    
Here's an example of how these time units can be useful:
    
    
```js

uint lastUpdated;

// Set `lastUpdated` to `now`
function updateTimestamp() public {
  lastUpdated = now;
  }
  
  // Will return `true` if 5 minutes have passed since `updateTimestamp` was 
  // called, `false` if 5 minutes have not passed
  function fiveMinutesHavePassed() public view returns (bool) {
    return (now >= (lastUpdated + 5 minutes));
    }
```

#### Passing Structs as Arguments

You can pass a storage pointer to a struct as an argument to a private or internal function. This is useful, for example, for passing around our Zombie structs between functions.

The syntax looks like this:

```js
function _doStuff(Zombie storage _zombie) internal {
  // do stuff with _zombie
  }
```

This way we can pass a reference to our zombie into a function instead of passing in a zombie ID and looking it up.

#### View Functions Dont Cost Gas

view functions don't cost any gas when they're called externally by a user.

This is because view functions don't actually change anything on the blockchain – they only read the data. So marking a function with view tells web3.js that it only needs to query your local Ethereum node to run the function, and it doesn't actually have to create a transaction on the blockchain (which would need to be run on every single node, and cost gas).

We'll cover setting up web3.js with your own node later. But for now the big takeaway is that you can optimize your DApp's gas usage for your users by using read-only external view functions wherever possible.

Note: If a view function is called internally from another function in the same contract that is not a view function, it will still cost gas. This is because the other function creates a transaction on Ethereum, and will still need to be verified from every node. So view functions are only free when they're called externally.

#### Storage is Expensive in Solidity

One of the more expensive operations in Solidity is using storage — particularly writes.

This is because every time you write or change a piece of data, it’s written permanently to the blockchain. Forever! Thousands of nodes across the world need to store that data on their hard drives, and this amount of data keeps growing over time as the blockchain grows. So there's a cost to doing that.

In order to keep costs down, you want to avoid writing data to storage except when absolutely necessary. Sometimes this involves seemingly inefficient programming logic — like rebuilding an array in memory every time a function is called instead of simply saving that array in a variable for quick lookups.

In most programming languages, looping over large data sets is expensive. But in Solidity, this is way cheaper than using storage if it's in an external view function, since view functions don't cost your users any gas. (And gas costs your users real money!).

We'll go over for loops in the next chapter, but first, let's go over how to declare arrays in memory.

#### Declaring Arrays in Memory

You can use the memory keyword with arrays to create a new array inside a function without needing to write anything to storage. The array will only exist until the end of the function call, and this is aot cheaper gas-wise than updating an array in storage — free if it's a view function called externally

Here's how to declare an array in memory:

```js
function getArray() external pure returns(uint[]) {
  // Instantiate a new array in memory with a length of 3
    uint[] memory values = new uint[](3);
      // Add some values to it
        values.push(1);
	  values.push(2);
	    values.push(3);
	      // Return the array
	        return values;
		}
```
Note: memory arrays must be created with a length argument (in this example, 3). They currently cannot be resized like storage arrays can with array.push(), although this may be changed in a future version of Solidity

#### The Payable Modifier

payable functions are part of what makes Solidity and Ethereum so cool — they are a special type of function that can receive Ether.

Let that sink in for a minute. When you call an API function on a normal web server, you can't send US dollars along with your function call — nor can you send Bitcoin.

But in Ethereum, because both the money (Ether), the data (transaction payload), and the contract code itself all live on Ethereum, it's possible for you to call a function and pay money to the contract at the same time.

This allows for some really interesting logic, like requiring a certain payment to the contract in order to execute a function.

```js
contract OnlineStore {
  function buySomething() external payable {
      // Check to make sure 0.001 ether was sent to the function call:
          require(msg.value == 0.001 ether);
	      // If so, some logic to transfer the digital item to the caller of the function:
	          transferThing(msg.sender);
		    }
		    }
```
Here, msg.value is a way to see how much Ether was sent to the contract, and ether is a built-in unit.

What happens here is that someone would call the function from web3.js (from the DApp's JavaScript front-end) as follows:

```js
// Assuming `OnlineStore` points to your contract on Ethereum:
OnlineStore.buySomething({from: web3.eth.defaultAccount, value: web3.utils.toWei(0.001)})
```

#### Payable Functions in Solidity

You can pay ether to a contract using a payable function. the ether sent is then stored in that contract adding to its value

```js

uint minAmount = 0.01 ether;

function payIntoContract(uint _userId) external payable onlyOwner {
	require(msg.value > minAmount);
	userDeposits[_userId] += msg.value;
}
```

#### Withdrawals


After you send Ether to a contract, it gets stored in the contract's Ethereum account, and it will be trapped there — unless you add a function to withdraw the Ether from the contract.

You can write a function to withdraw Ether from the contract as follows:

```js

contract GetPaid is Ownable {
  function withdraw() external onlyOwner {
      owner.transfer(this.balance);
}

```
Note that we're using owner and onlyOwner from the Ownable contract, assuming that was imported.

You can transfer Ether to an address using the transfer function, and this.balance will return the total balance stored on the contract. So if 100 users had paid 1 Ether to our contract, this.balance would equal 100 Ether.

You can use transfer to send funds to any Ethereum address. For example, you could have a function that transfers Ether back to the msg.sender if they overpaid for an item:
```js
uint itemFee = 0.001 ether;
msg.sender.transfer(msg.value - itemFee);
```
Or in a contract with a buyer and a seller, you could save the seller's address in storage, then when someone purchases his item, transfer him the fee paid by the buyer: seller.transfer(msg.value).
`
These are some examples of what makes Ethereum programming really cool — you can have decentralized marketplaces like this that aren't controlled by anyone.
