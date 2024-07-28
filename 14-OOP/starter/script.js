'use strict';
// construtor function Person
const Person = function (firstName, birthYear) {
  console.log(this); // this points to empty object
  // setting properties on the object
  this.firstName = firstName;
  this.birthYear = birthYear;
//   this.calAge = function(){} bad pratice 
};

// 1. New Object is created {}
// 2. function is called, this = {}  new empty object
// 3. {} is linked to prototype
// 4. function automatically returns {}

const jonas = new Person('Jonas', 1991);
const aditya = Person('Aditya', 1996); // constrctor function

console(jonas instanceof Person); // true

// Prototypes
Person.prototype.calAge = function(){
    console.log(2037 - this.birthYear);
}

jonas.calAge();