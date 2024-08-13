'use strict';
// construtor function Person
const Person = function (firstName, birthYear) {
  console.log(this); // this points to empty object
  // setting properties on the object
  this.firstName = firstName;
  this.birthYear = birthYear;
  //   this.calAge = function(){......} bad pratice: never create a method inside a constructor function
};

// 1. New Object is created {}
// 2. function is called, this = {}  new empty object
// 3. {} is linked to prototype
// 4. function automatically returns {}

const jonas = new Person('Jonas', 1991);
const aditya = new Person('Aditya', 1996); // constructor function

console(jonas instanceof Person); // true

// Prototypes
Person.prototype.calAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calAge();
console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype);
console.log(Person.prototype.isPrototypeOf(Person)); // false
console.log(Person.prototype.isPrototypeOf(jonas)); // true

Person.prototype.species = 'Homo Sapiens';
console.log(jonas, aditya);
console.log(jonas.hasOwnProperty('species')); //false
console.log(jonas.hasOwnProperty('firstName')); // true
