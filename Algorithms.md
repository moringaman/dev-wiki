
![javascript](http://i.imgur.com/321YoZO.png)

# Algorithm Documentation
&nbsp;

## Exercises
&nbsp;

### 1. Reverses String

&nbsp;

Reversing strings can be done in a number of ways, the simplest of which is to  use
some of the array prototypes buit in helpers.

1. You can split reverse and then join a word which basically splits it into an array
then reversed the order of the elements and finally joins it back together. (see below)


	```javascript
	const reversesString = (str) => {
	return srt.split("")
		.reverse().
		.join("")
	}
	```

2. Another method is to use a for let loop to re-order all our letters (see below)


	```js
	function reverseString(str) {
		reversed = ""
			for (let char of str){
				reversed = reversed + char
			}
		return reversed
	}
	```

&nbsp;


### 2. Palindromes 

&nbsp;


 A palindrome is a word that reads the same backwards as it does forwards, there are a number of ways to check to see if a word fits into this definition

1. Use prototype.every() to check if the 1st-last 2nd-2nd from last etc.. letters are identical. (see below)

	```javascript
	function palindrom(str) {
		return.str.split('')  			// _split the word into an array_
			.every((char, i) => { 		// _pass each character and the current index into every
		return char === str[str.length -i -1]; // _on each interation compare the current char with the character
								//at the end of the word minus the current index minus 1
       	}) 
	}
	```

2. Simply use a for loop to add each character to the end of a new string variable called reversed then compare it to the initial string:-

	```javascript 
	function palindrome(str) {
	  let reversed = ''				// create reversed variable
		  for(let char of str) {		// loop through all characters
			  reversed = char + reversed	// re-write reversed with the new character at the start
		  }
	  return reversed === str;			// return the boolean of the comparison between reversed and string
	}
	```
3. Most easy of all you can use array helpers to reverse the string and then check if it is the same
   as the original string. if not it cant be a palindrome

```js

	function palindrome(str) {
	  let reversed = str
	    .split("")
	    .reverse()
	    .join("");
	  return reversed === str;
	}
```

### 3. Reversing an Integer
&nbsp;

We can reverse integers in much the same way as we reverse strings, however we first need to convert it into a string and then back into an integer once the character re-ordering has completed.

```js
	function reverseInt(n){
	let reversed = n
		.toString()
		.split("")
		.reverse()
		.join("")
	return parseInt(reversed) * Math.sign(n) // Math.sign returns the sign of a number
						// Here we times the number by the sign so
						// that we return a reverse number of the 
						// same sign
	}
```
&nbsp;

### 4. Finding most frequently occuring character (MaxChar)
&nbsp;

In solving this problem we need to create an object into which we place our word or phrase. Each letter is added as a key and given a value equal to the number of it's occurances.

1. First we create an empty object then loop though each character using a **for of**  iterator. we then check to see if object[char] index is equal to 0 if it is we give it a value of 1 if not we incerment it's value by 1.

```js

	function maxChar(str) {
		let chars = {}
	 		for (char of str){
		!chars[char]? chars[char]=1 : chars[char]++
		}
	}
```

Similarly we could rephrase the above function without a ternerary operator (see below);

```js
	function maxChar(str){
	 let chars = {}
	  for (char of str){
	   if(!chars[char]) {
	     chars[char] = 1
	   }else{
	     chars[char]++
	   }
	 }
	}
```

2. Next, we create two variables, **max** to store the largest current letter occurance and **maxChar**  to store the character holding the highest count as we loop through our characters.

3. We populate these variables by checking to see if the value of our character at the current position is greater than **max** if it is we increase it by 1 and set maxChar to our current character.

```js

function maxChar(str) {
  let charMap = {};
  let max = 0; // Largest total occurances
  let maxChar = ""; // currently most common character
  for (let char of str) {
    !charMap[char] ? (charMap[char] = 1) : charMap[char]++;
    if (charMap[char] > max) {
      max++;
      maxChar = char;
    }
  }
  return maxChar;
}
```

4. After we have looped through all our characters we can return **maxChar** which will be our most commonly occuring character.

&nbsp;

### 5. FizzBuzz

FizzBuzz is a common problem which requires you to loop from 1 to n and output **fizzbuzz** if the number is divisible by say 3 and 5, fizz if divisible by 3 and buzz if divisible by just 5. Otherwise the number itself is the output.

In order to solve this kind of problem we can use the % or (modulus operator) which gives the reminder of dividing one number by another. If the result is 0 then the first number is fully divisible by the other if not then it doesn't go.

1. We start by looping through our number from 1 to n and running our first mudulus checks for both 3 and 5.

	```js
		for(let i=1; i <=n; i++){
			if(i % 3 === 0 && I % 5 ===0){
			console.log("fizzbuzz")
			}
		}
	```

2. Next we do our other checks as the first conditions both being met in complete now we check for either/or outcomes as below.

	```js
		else if (i % 3 === 0){
		console.log("fizz")
		} else if (i % 5 == 0){
			console.log("buzz")
		}
	```

3. Finally we console log just the number should none of our conditions be met.

	```js
		else {
		console.log(i)
		}
	```

	This is the final function in its enterety.

	```js
		function fizzbuzz(n) {
		 for (let i=1; i<=n; i++) {
		  if (i % 3 === 0 && i % 5 === 0 ) {
		    console.log("fizzbuzz")
		  } else if (i % 3 === 0) {
			  console.log("fizz")
		  } else if (i % 5 === 0) {
			  console.log("buzz")
		  } else {
		  console.log(i)
		  }
		}
		}
	```


### 6. Chunks - splitting arrays into chunks
&nbsp;
This problem involves taking an array of elements and splitting it up into a two dimentional array with chunks of a predifined length

1. first we need to create a new array called chunked in which to store our newly chunked array elements and then we cal use a for loop to iterate through the array which has been passed in to our function

	```js
		let chunked = []
		  for (let element in array){
		  }
	```

2. next we are going to find the last element in our chunked array and see if it is either empty or equal to our stipulated chunk size. If so we are going to push a new array containing our element onto our array.

	```js
		function chunk(array, size) {
		
		let chunked = []
		  for (let element in array){
		let last = chunked[chunked.length -1]
			if (!last || last.length === size){
			chunked.push([element])
			} else {
			last.push(element)
			}
		  }
		return chunked
		}
	```

3. If however the **last** [...] does exist but has not been filled with x number of elements as per our size parameter then we just push the current element onto the **last** chunk

#### The Array Slice Solution

This problem can also be solved by using the array slice method which allows you to take a slice out of an array starting at and including the f1st and 2nd parameter i.e array.slice(3, 5) takes the element at index 3 - 5 out of an array.
Baring this is in mind we can use this to iterate through an array and cut it into chunks based on our size parameter and the index that we are at.

1. first we are going to declare and empty array called **chunked** and an integer called **index** then we can run our while loop to loop through the array, take slice from index to size, plush it onto our empty chunked array and then increase the value of index by size.

	```js
		function chunk(array, size) {
			let chunked = []
			let index = 0
			while (index < array.length) {
				chuncked.push(array.slice(index, index + size))
					index += size
			}
			return chunked
		}

As you can see this is a more terse way of solving the same problem and can also demonstrate you knowledge of some of javascripts helper methods.
