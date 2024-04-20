'use strict';

///////////////////////////////////////
// Scoping in Practice

/*
function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;
      // Creating NEW variable with same name as outer scope's variable
      const firstName = 'Steven';

      // Reasssigning outer scope's variable
      output = 'NEW OUTPUT!';

      const str = `Oh, and you're a millenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
    }
    // console.log(str);
    console.log(millenial);
    // console.log(add(2, 3));
    console.log(output);
  }
  printAge();

  return age;
}

const firstName = 'Jonas';
calcAge(1991);
// console.log(age);
// printAge();


///////////////////////////////////////
// Hoisting and TDZ in Practice

// Variables
console.log(me);
// console.log(job);
// console.log(year);

var me = 'Jonas';
let job = 'teacher';
const year = 1991;

// Functions
console.log(addDecl(2, 3));
// console.log(addExpr(2, 3));
console.log(addArrow);
// console.log(addArrow(2, 3));

function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

var addArrow = (a, b) => a + b;

// Example
console.log(numP  roducts);
if (!numProducts) deleteShoppingCart();

var numProducts = 10;

function deleteShoppingCart() {
  console.log('All products deleted!');
}

var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x);  window object  
console.log(y === window.y);
console.log(z === window.z);


///////////////////////////////////////
// The this Keyword in Practice
console.log(this); global object : window 

const calcAge = function (birthYear) {
  console.log(2037 - birthYear);
  console.log(this) NOTE 1 undefined as strict mode (Normal function call) 
  without strict mode it wil be again a global object
};
calcAge(1991);

const calcAgeArrow = birthYear => {
  console.log(2037 - birthYear);
  console.log(this); NOTE 2 window from line 94 : lexical this : arrow function does not have it's own this
  arrow fuction uses this of it's parent function
};
calcAgeArrow(1980);

const jonas = {
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year); NOTE 3 this here points to the jonas object
    (object calling the method line117)
    NOTE this does not point to the object in which it is written
  },
};
jonas.calcAge();

const matilda = {  
  year: 2017,
};

matilda.calcAge = jonas.calcAge; // Review method borrowing
matilda.calcAge(); now line 113 will point to matilda(eg that this keyword is dynamic)

const f = jonas.calcAge; // callling function into a new variable(possible because function is just a value)
f(); line 113 undefiined and error as regular function call does not this keyword


///////////////////////////////////////
// Regular Functions vs. Arrow Functions
// var firstName = 'Matilda'; NOTE var creates firstName property on window object 


const jonas = {
  firstName: 'Jonas',
  year: 1991,
  calcAge: function () {
    // console.log(this);
    console.log(2037 - this.year);

    Q: pitfall of this keyword is when we have a function(isMillenial) inside of a method(calcAge).

    // Solution 1
    // const self = this; // self or that
    // const isMillenial = function () {
    //   console.log(self);
    //   console.log(self.year >= 1981 && self.year <= 1996);
    // };

    // Solution 2
    const isMillenial = () => {
      console.log(this); this from calcAge() , so this pointing to jonas object
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillenial(); regular fuction call
      Solution 1 : inside a regular function call this keyword is undefined

  },

  greet: () => {
    console.log(this); arrow function doesn't have it's own this keyword this: window object
    console.log(`Hey ${this.firstName}`); // hey undefined (global scope) 
  },
};
jonas.greet(); NOTE never use arrow function as a method Output Hey Matila(line 134)

jonas.calcAge();(line 144)


// arguments keyword Review 
const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};
addExpr(2, 5);
addExpr(2, 5, 8, 12); // no error 

var addArrow = (a, b) => {
  console.log(arguments); arrow function does not get agrumrnt keyword
  return a + b;
};
addArrow(2, 5, 8);


///////////////////////////////////////
// Objects vs. primitives
let age = 30;
let oldAge = age;
age = 31;
console.log(age);
console.log(oldAge);

const me = {
  name: 'Jonas',
  age: 30,
};
const friend = me;
friend.age = 27;
console.log('Friend:', friend);
console.log('Me', me);


///////////////////////////////////////
// Primitives vs. Objects in Practice

// Primitive types
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName, oldLastName);

// Reference types
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};
const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';
console.log('Before marriage:', jessica);
console.log('After marriage: ', marriedJessica);
// marriedJessica = {};

// Copying objects
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};

const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = 'Davis';

jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');

console.log('Before marriage:', jessica2);
console.log('After marriage: ', jessicaCopy);
*/
