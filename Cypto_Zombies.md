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

```
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


