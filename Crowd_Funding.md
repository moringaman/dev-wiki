# Solidity Contract - Crowd Funding Example



#### The Campaign Factory


Create a campaign factory which is an initial campaign which can be called by various ethereum accouns to spawn instances of the main Campaign contract.


```js

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

```


1. Create an address array or (**array of type address**) to store all campaign addresses deployed by our factory.  ``  address[] public deployedCampaigns  ``

2. Create a createCampaign function which takes a minimum contribution value as an unsigned integer ahd creates a new campaign by calling the Campaign contract and passing in the minimum amount and the account that created it as the msg.sender.

3. finally add the address of the new Campaign contract to the array of deployed campaigns.


#### NOTE

This campaign also has a **getDeployedCampaigns** function which can be used to query all contracts that it has created.


### The Campaign



1. First our Campaign contract is instantiated with the following campaign function which has the same name as our campaign and is executed automatically


`` contract  Campaign { ... } ``



2. and the two parameters that are passed to it by the factory are declared as **public** variables


`` address public manager `` & `` uint public minimumContribution ``


3. Next we set up our contract with the main contract function which takes our two values as follows


```js

    function Campaign(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }

```


1. This establishes the campaign manager as the creator or Ethereum account that created it as well as establishing the minimum contribution for anyone wishing to contribute to the campaign.

2. Now in order to create a request we need to declare a struct (or data structure) type that we will use for each request that will be later pushed into an array of requests, see below;


```js

struct Request {
  string description;
  uint value;
  address recipient;
  bool complete;
  uint approvalCount;
  mapping(address => bool) approvals;
}

```


You can see from the above struct that we also have a mapping which will holds all the addresses of our approvers as a key mapped to a boolean denoting whether it has been approved by that account or not.



### Campaign Contributions



1. In order for us to allow people to contribute to our campaign contract we need to create a **Payable** function called contribute. This function will chack that the amount sent or **msg.value** is greater than our minimumContribution.


 

`` require(msg.value > minimumContribution) ``




1. We are also going to add the contributors wallet address to the list of campaign approvers (**people who can approve requests**). To do this we need to create a mapping called approvers that maps their address to a boolian value. see below:



  `` mapping (address => bool) public approvers; ``


2.  So once we have checked that  the contribution amount is enough we will map the address to true in our approvers mappings with:



``   approvers[msg.sender] = true; ``


3. lastly we need to increment an approversCount variable by one to keep track of how many approvers/contributers we have with

``  approversCount++ ``


```js
   function contribute() public payable {
     require(msg.value > minimumContribution);
     approvers[msg.sender] = true;
     approvalCount++
   }

```

   The fact that the function is **payable** means that it is able to accept **ether** to be added to `` this.balance `` or the contract balance.


#### Requests


6. Before we can create a request we need to declare an empty array of our Request structure data-type called requests, we do that using the following statement;


`` Request[] public requests; // our public keyword will automatically create a getter for our array ``


7. Now we can use our createRequests  function which will take all our request parameters and populate a Request struct object to be pushed to our requests array.


```js

function createRequest(string description, uint value,
		address recipient) public restricted {
  Request memory newRequest = Request({
    description: description;
    value: value;
    recipient: recipient;
    complete: false;
    approvalCount: 0;
  })
  requests.push(newRequest);
}

```



1. The above function is public so that it can called externally also we create an instance of the Request struct called newRequest as a pointer with the memory keyword. This temporary object is then pushed onto our empty array requests

2. You'll also notice that the createRequest function is marked restricted. This is because we are using a modifier that ensures that only the campaign creator or manager can run it.


```js

modifier restricted() {
  require(msg.sender == manager);
  _;
}

```



#### Request Approvals



1. In our approveRequest function we are going to select a request by it's index from our array of Request objects (or Structs) called requests create some storage for it in order to update it's approvals membership and icrement the approval count.


```js

function approveRequest(uint index) public {
  Request storage request = requests[index];
}

```



1. Next we need to make sure that first the approver is one of our campaign approvers with:

   `` require(approvers[msg.sender]);  // is this a truthy value ``

2. We also need to make sure that they have not already approved our selected request with.

   `` require(!request.approvals[msg.sender]); // are they in the request Structs approvals mapping? ``

3. Finally we need to add the sender to the request Structs approval mapping and increment the requests approval count with:

   `` request.approvals[msg.sender] = true; ``

   `` request.approvalCount++ ``

4. So our final function looks like:-


```js

   function approveRequest(iuint index) public {
     Request storage request = requests[index];
     require(approvers[msg.sender]);
     require(!requests.approvals[msg.sender]);
     
     requests.approvals[msg.sender] = true;
     requests.approvalCount++;
   }

```


### Finalizing Requests


1. In order to finalize a request which results in the funds being sent to the suppliers wallet we first create a public function which utilizes the
  restricted modifier and accepts the index of the request to be finalized.  

2. Next we need to create a place in memory called request and set it equal to requests array at the index provided

3. Thirdly we need to check that most of our approvers have given their approval this is done by checking that our approcal count is\
  greater that half of approversCount. We also make sure that the request has not already been completed.

```js

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;
    }
 
```
4. finally we transfer the value to the requests recipient and mark the request as completed.

