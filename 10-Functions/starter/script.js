'use strict';

// default parameters
const bookingArr = [];
const createBooking = function (
  flightNum,
  numPassengers = 1, // default value is 1
  price = 199 * numPassengers // only calcul ate bcz numPassengers defined above
) {
  const bookingObj = {
    flightNum, // <------  object literal flightNum : flightNum
    numPassengers,
    price,
  };
  console.log(bookingObj);
  bookingArr.push(bookingObj);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 3);
// createBooking('LH123', , 6); cannot skip any values
createBooking('LH123', undefined, 200);

// passing values primitive vs refernce
const flight = 'Lh234'; // primitive type(string)
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: '2356788051',
};
const checkIn = function (flightNum, passenger) {
  // flightNum is different variable and is copy of flight  ie flightNum = flight;
  flightNum = 'LH999'; // NOT a  good coding practice
  passenger.name = 'Mr.' + passenger.name; // object got updated we are really only copying the reference to that object in the memory heap,: passeenger = jonas
  // if (passenger.passport === '2356788051') {
  //   alert('Checked in');
  // }else{
  //   alert('Wrong passport!');
  // }
};
checkIn(flight, jonas);
console.log(flight, jonas); // Lh234  Mr. Jonas Schmedtmann
//  passing a primitive type to a function is same as creating a copy outside of the function.So the value is simply copied.
// On the other hand, when we pass an object to a function,it is like copying an object refernce
// And so whatever we change in a copywill also happen in the original.they both point to the same object in memory.

const newPassport = function (person) {
  person.passport = '1234567890'; // jonas.passport : reassigned
};

newPassport(jonas); // two functions manupulating the same object
checkIn(flight, jonas);

// NOTE JS has  passing by value ONLY , NO by reference

// Review
// First class functions: fn are first class citizens ie functions are simply values ie type of an object in JS

// higher order functions is either a function that receives another function as an argument, or a function that returns a new function.

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// higher order function
const transformer = function (str, fn) {
  console.log(`original String: ${str}`);
  console.log(`transformed String: ${fn(str)}`);
  console.log(`transformed by: ${fn.name}`);
};

transformer('javaScript is the best', upperFirstWord);
transformer('javaScript is the best', oneWord); // call back functions

// call back fn helps in creating abstraction: hide unnecessary codes

///////////////////
// function returning a function
const greet = function (greeting) {
  return function (name) {
    console.log(`${name} ${greeting}`);
  };
};
// arrow function
const greetArr = greeting => name => console.log(`${name} ${greeting}`);

const greeter = greet('Hey!');
greeter('Jonas');
greeter('Steven');

greet('Hello')('Jonas');
greetArr('Hi')('Michael');

const lufthansa = {
  airline: 'lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    // --> enhanced object literal syntax
    // book: function() {}
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode} on ${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode} ${flightNum} , name` });
  },
};

lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'Steven');
console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
  // we want the book method here as well
};

const book = lufthansa.book; // for using book fn on eurowings, swiss, assigned it in a new function
// book(23, 'Sarah Williams'); // Cannot read properties of undefined (reading 'airline')
// regular fn call , this keyword inside of it points to undefined

// Review to fix the issue of 'this' to point to eurowings -- call() , apply() , bind()
book.call(eurowings, 123, 'Sarah Williams'); // call(what/ wgich obj 'this' needs to point to, other agruments...)
console.log(eurowings);
book.call(lufthansa, 239, 'Mary Cooper');

const swiss = {
  // new object
  airline: 'Swiss Airlines', // all property names should have same name
  iataCode: 'LX',
  bookings: [],
};
book.call(swiss, 5465, 'Jones marshall');

// Apply method apply(obj , arrayOfAgruments[])
const flightData = [5465, 'George Cooper'];
book.apply(swiss, flightData); //--> not that much used these days
book.call(swiss, ...flightData); // same as apply method
console.log(swiss);

// bind method Review
// bind also allows us to manually set 'this'for any function call.bind does not immediately call the function.
// Instead it returns a new function where this keyword is bound.
// book.call(eurowings, 237, 'Mary Cooper');
const bookEW = book.bind(eurowings); //  doesnt call th book function, new fn with 'this' set to eurowings
bookEW(23, 'Sarah Williams');
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

const bookEW23 = book.bind(eurowings, 23); // presetting the fn argument: partial application
bookEW23('Jonas Schmedtmann');

// with event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};
// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane); this ---> button
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// partial application
const addTax = (rate, value) => value + value * rate;

const addVAT = addTax.bind(null, 0.23);
// addVAT = value => value = value* 0.23;
// console.log(addVAT(100)); //123

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));

// challenge 1
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    //get answer
    const answer = Number(
      prompt(`${this.question}\n 
     ${this.options.join('\n')}\n(Write Option number)\n`)
    );
    console.log(answer);

    //register answer
    typeof answer === 'number' &&
      answer < this.answers &&
      this.answers[answer]++;
    // console.log(this.answer);
    this.displayResults();
    this.displayResults('string');
  },
  displayResults(type = 'array') {
    if (type === ' array') {
      console.log(this.answers);
    } else if (type === 'string') {
      // console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};
// poll.registerNewAnswer();

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answer: [5, 2, 3] }, 'string');

// IIFE
(function () {
  console.log('This will run once ONLY');
})();

//closures is not a feature that we explicitly use.we don't create closures manually,closure simply happens automatically
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(passengerCount);
  };
};

const booker = secureBooking();
booker();
booker();
booker();
// a closure is the closed over variable environment of the execution context in which a function was created
//even after that execution context is gone,or in other words, even after the function to which the execution context belongs has returned.
console.dir(booker);

let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};
const h = function () {
  const b = 77;
  f = function () {
    console.log(b * 2);
  };
};
g();
f();

h();
f();

const boardPassengers= function(n , wait){
  const perGroup = n/3;
  setTimeout(function(){
    console.log(`we are now boarding a;; ${n} passengers `);
    console.log(`There are 3 groups , each with ${perGroup} passengers`);
  } , wait* 1000)
}

boardPassengers(180, 3)