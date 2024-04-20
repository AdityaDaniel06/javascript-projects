'use strict';
/* Food delivery simulation app 
    1) Array Destructing(video #103)
      destructuring is an ES6+ feature and it's basically a way of unpacking values from an array or an object into separate variables.
      So in other words destructuring is to break a complex data structure down into a smaller data structure like a variable.
   
    2) Object destructuring(video #105)
        to destructure objects we use the curly braces with the exact property names of the object

    3) spread operator (...right side of assignment operator)
      expand element of an array all at once
      the difference bw destructuing & spread operator takes all the elements from the array and it also doesn't create new variables.
      usecase: in places where we would otherwise write values separated by commas. 
          to create shallow copies of arrays,
          and to merge two arrays together.
        
    NOTE spread operator works iterables like all arrays, strings, maps, or sets, but not objects.
    used only where multiple values separated by a comma are usually only expected such as when we pass arguments into a function,or when we build a new array.
    
    4) Rest pattern(...) on left side of assigmnet operator : opposite of spread
      pack elements into an array

    5) Logical operator:Use any datatype and return any datatype
        short circuit evalution: 
          OR || if the first value is truety value then returns the truety value
          AND && short circuits and returns the first falsy value if not then last value
    
    6) Nullish coalescing Operator(??): NULL and undefined
      works with the concept of NULL values instead of falsy values

    7)logical assignment operator
      OR Assignment:  
        if value doesn't exist,then creates  it else does nothing to already existing
      AND Assigment: 
        if doesn't exist does nothing; if value exists then reassigns
      nullish assigment: 
    8) Object literal:
      Syntax
    9)Optional Chainings ?. 
    
    10) SETS and MAPS  DS
      SET is a collection of unique values ie no duplicate values --> let orderSet = new Set(any iterables)
      Map is stored in key value: keys can have any types
      */
const arr = [2, 4, 6];
// normal breaking an array
const a = arr[0];
const b = arr[1];
const c = arr[2];
// destructuring an array in js:NOTE const [  varibale name] = array
const [x, y, z] = arr; //  destructuring assignment !array; original arr remains unchanged

// nested array destructuring
const nested = [2, 4, [5, 6]];
const [f, , g] = nested; // Output console.log( f, g); 2,[5,6]
const [i, , [j, k]] = nested; //cl(1 , j, k);  2,5,6  as separate varibles. destructuting inside of destructuring

// set default values: use case- length of array is unknown
// const [p ,q ,r] = [2, 5]; r undefined
const [p = 1, q = 1, r = 1] = [2, 5]; // intialiization

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]]; // this points restaurant object
  },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    //only 1 input parameter & order does'nt matter
    console.log(`Order recieved ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]}
    will be deliverd to ${address} at ${time}`);
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is yout pasta with ${ing1} ,  ${ing2} and ${ing3}`);
  },

  orderPizza: function (mainIngredient, ...otherIngredient) {
    console.log(mainIngredient, otherIngredient);
  },
};

// const [first, second] = restaurant.categories;  italian pizzeria
const [first, , second] = restaurant.categories; // const[x, ,y ] = Italian Vegetarian
console.log(first, second);

let [main, secondary] = restaurant.categories;
[main, secondary] = [secondary, main]; // switch values of variables without temp variables
/* const temp = main;
  main = secondary
  secondary = temp*/

restaurant.order(2, 0); // [starterMenu[Garclic bread] , mainMenu[Pizza]]
// receive 2 return values from function: creating  2 varibles from one function call 
const [theStarter, theMainCourse] = restaurant.order(2, 0);
// console.log(theStarter , theMainCourse);

// object destructuring const{x,y,z} = object
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant; //3 new variable names console.log(resturantName , hours, tags)

// default values for an object
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// mutating variables
let ai = 111;
let bi = 999;
const obj = { ai: 23, bi: 7, ci: 14 };
({ ai, bi } = obj); // cl(a,b) // 23 ,7

// nested objects destructuring
// const { objectname: {innerObject}}
const {
  fri: { open: o, close: clo },
} = openingHours;

restaurant.orderDelivery({
  time: '22:30',
  address: ' via del sole ,21',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: ' via del sole ,21',
  starterIndex: 2,
});

// spread operator
const arrSpread = [7, 8, 9];
const badNewArr = [1, 2, arrSpread[0], arrSpread[1], arrSpread[2]];
// Spread operator takes out every elemnent of array
const goodNewArrray = [1, 2, ...arrSpread]; // [1 , 2 , 7 , 8, 9]
console.log(...goodNewArrray); // 1 2 7 8 9

// adding one more food item in menu array
const newMenu = [...restaurant.mainMenu, 'Gnocci'];

//Copy array
const mainMenuCopy = [...restaurant.mainMenu];

// merge array
const jointMenu = [...restaurant.mainMenu, ...restaurant.starterMenu];

// spread strings
const str = 'Jonas';
console.log(...str); //
const letters = [...str, , 'S.'];

// const ingredients = [
//   prompt("Let's make Pasta! Ingredient1 ?"),
//   prompt('Ingredient 2 ?'),
//   prompt('Ingredient 3?'),
// ];

// console.log(ingredients);
// restaurant.orderPasta(ingredients[0],ingredients[1],ingredients[2]);
// restaurant.orderPasta(...ingredients);

//spread with objects
const newRestaurant = { foundedIn: 1988, ...restaurant, founder: 'Guiseppe' };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
// console.log(restaurantCopy.name);
// console.log(restaurant.name);

// SPREAD on right isde
const ar = [1, 2, ...[3, 4, 5]];

// REST on the left side
const [ax, by, ...others] = [1, 2, 3, 4, 5]; //  1,2,[3,4,5]
const [piz, ris, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(piz, ris, otherFood);

//Object REST
const { saturday, ...weekdays } = restaurant.openingHours;

const add = function (...numbers) {
  console.log(numbers);
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
};

add(2, 3);
add(3, 5, 56, 9, 6, 7);

const xy = [23, 5, 8];
add(...xy);

restaurant.orderPizza('mushrooms', 'olivies', 'spinach');
restaurant.orderPizza('sweetcorn');

//Logical operators OR || :first truety value
console.log(3 || 'Jonas'); //3
console.log('' || 'Jonas'); // Jonas
console.log(true || 0); // true
console.log(undefined || null); // null

restaurant.numGuests = 0; // 10 which is wrong
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10; // 10
const guests2 = restaurant.numGuests || 10; // 10

// workaround line 229
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);

// logical oerator AND && : returns first falsy value or last value if all values are true
console.log(0 && 'Jonas'); // 0
console.log(7 && 'Jonas'); // Jonas

if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}
restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');

const rest1 = {
  name: 'Capri',
  numGuests: 20,
};
// const rest1 = {
// numGuests: 0, rest1.numGuests ||= 10; fail use case as reassigned 10
//   name: 'Capri', 0 falsey value  rest1.numGuests = rest1.numGuests || 10: fail use case
// };

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

rest2.numGuests = rest2.numGuests || 10; // applying numGuests property to rest2: shortcircuiting OR // 10
rest1.numGuests = rest1.numGuests || 10; //already has numGuest so no change
// Logical OR assignment operator
rest2.numGuests ||= 10; // applying numGuests property to rest2
rest1.numGuests ||= 10;

// nullish coaleshing operator
rest2.numGuests ??= 10; // applying numGuests property to rest2
rest1.numGuests ??= 10; // use this over OR

//  AND assignment operator
rest2.owner = rest2.owner && '<ANONYMOUS>'; // first falsey value returned
rest1.owner = rest1.owner && '<ANONYMOUS>'; // owner assigned undefined as it does'nt exists

rest1.owner &&= '<ANONYMOUS>'; // if values doesn't exists then does nothing
rest2.owner &&= '<ANONYMOUS>'; // if exists then reassigns

// for of loop
const menu2 = [...restaurant.starterMenu, ...restaurant.mainMenu];
for (const i of menu2) console.log(i);

// to get index in for of is tough
// OUTPUT :returns a nested array with index and each element as inner array
// console.log(i);
for (const i of menu2.entries()) console.log(`${i[0] + 1}: ${i[1]}`);

for (const [i, el] of menu2.entries()) {
  // using destructuing(same as above)
  console.log(`${i + 1} : ${el}`);
}
// Property NAMES
const properties = Object.keys(openingHours); // OUTPUT [thu,fri,sat] ie an array
for (const day of Object.keys(openingHours)) // looping through array
  console.log(day);

// property Values
const values = Object.values(openingHours);
console.log(values); //  [{open: 12, close: 22} , {open: 11, close: 23},{open: 0, close: 24}]

// Entries - NAMES + Values
const ent = Object.entries(openingHours);
console.log(ent); // [ ['thu' , {open: 12, close: 22} ] , [ ] , [ ] ]
for (const x of ent) {
  console.log(x);
}

for (const [keys, { open, close }] of ent) {
  // [keys , values]
  console.log(keys, open, close);
}

// SETs
const orderSet = new Set([
  'Pasta',
  'Pasta',
  'Pizza',
  'Risotto',
  'Pizza',
  'Pasta',
]);
console.log(orderSet); // {'Pasta', 'Pizza', 'Risotto'}
console.log(new Set('ADITYA')); // strings are also itrrable

console.log(orderSet.size); // 3
console.log(orderSet.has('Pizza')); // true  array.inclues()
console.log(orderSet.has('Bread')); // false

orderSet.add('Garlic Bread');
orderSet.add('Garlic Bread'); // gets added only added one time
console.log(orderSet); // {'Pasta', 'Pizza', 'Risotto','Garlic Bread'}
orderSet.delete('Risotto'); // orderSet.clear(); clear all valuein set

for (const order of orderSet) console.log(order); // can loop like an array
// sets have no indexing
// we cannot take out any individual value of a set

// main usecase: to remove duplicate values of the arrays
const staff = ['waiter', 'Chef', 'Manager', 'waiter', ' chef'];
const uniqueStaff = [...new Set(staff)];
console.log(uniqueStaff);
// console.log(([new Set(staff)]).size);
console.log(new Set('ADityaDaniel').size); // unique letters in a string

// MAPS
const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Italy');
console.log(rest.set(2, 'Portugal'));

rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open')
  .set(false, 'We are closed');

console.log(rest.get('name'));
console.log(rest.get(true));

console.log(rest.has('categories'));
rest.delete(2);
console.log(rest.size);
const arra = [1, 2];
rest.set(arra, 'Test');
console.log(rest.get(arra));

// rest.clear()

// another way to populate a map
const question = new Map([
  ['question', 'What is the best programming language?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct'],
  [false, ' try again'],
]);

// covert Object to map
//console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));

for (const [key, value] of question) {
  // Review
  if (typeof key === 'number') console.log('Options', key, value);
}

//convert map to array
console.log([...question]);
console.log(question.entries());
console.log([...question.values()]);
console.log([...question.keys()]);

//Coding challenge #1
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};
const [players1, players2] = game.players;
console.log(players1, players2);

// const gk = players1[0];
const [gk, ...fieldPlayers] = players1;
console.log(gk, players1);

const allPlayers = [...players1, ...players2];
console.log(allPlayers);

const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

const { team1, x: draw, team2 } = game.odds;
console.log(team1, draw, team2);

const printGoals = function (...players) {
  console.log(`${players.length} goals were scored`);
};
printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals('Davies', 'Lewandowski');
printGoals(...game.scored);

team1 < team2 && console.log('Team1 more likey to win');
team2 > team1 && console.log('Team2 more likey to win');

// Challenge #2

// for( let x of game?.scored){
//   console.log(`Goal  ${x}`);
// }
for (let i = 0; i < game.scored.length; i++) {
  console.log(`Goal ${i + 1} : ${game?.scored[i]}`);
}
// for (let x of Object.values(game.odds)) {
//   let a = +x;
//   console.log(a / game.odds.length);
// }

const scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}

// Coding challenge 3
const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

// console.log(gameEvents.values());
const events = [...new Set(gameEvents.values())];

gameEvents.delete(64);
console.log(`An event happened, on an average ${90 / gameEvents.size} minutes`);

for (const [min, event] of gameEvents) {
  const half = min <= 45 ? 'FIRST' : 'LAST';
  console.log(`[${half} HALF] :  ${event}`);
}

// STRINGS
const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]);
console.log('B737'[1]);
console.log(airline.length);
console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));

console.log(airline.slice(4)); // Air Portugal
console.log(airline.slice(4, 7)); // Air

console.log(airline.slice(0, airline.indexOf('')));
console.log(airline.slice(0, airline.lastIndexOf('') + 1));

console.log(airline.slice(-2)); // al
console.log(airline.slice(1, -1));

const passenger = 'jONas'; // Jonas
const lowerPassenger = passenger.toLowerCase();
const correctPassenger =
  lowerPassenger[0].toUpperCase() + lowerPassenger.slice(1);
console.log(correctPassenger);

// replace string
const priceGB = '288,97>';
const priceUS = priceGB.replace('>', '$').replace(',', '.');

const announcement =
  'All pass  engers come to boarding date 23, Boarding door 23';
console.log(announcement.replaceAll('door', 'gate'));

// split and join
console.log('a+very+nice+string'.split('+')); // ["a","very","nice","string"]
// console.log("Aditya Daniel".split(' ')); //  ['Aditya', 'Daniel']
const [firstName, lastName] = 'Aditya Daniel'.split(' ');
const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

const capitalizedName = function (name) {
  const names = name.split(' ');
  const upperName = [];
  for (const n of names) {
    upperName.push(n.replace(n[0], n[0].toUpperCase()));
    // upperName.push(n[0].toUpperCase() + n.slice(1));
  }
  console.log(upperName.join(' ')); // join is opposite of split
};
capitalizedName('jessica ann smith davis');

// padding
const message = 'Go to gate 23!';
console.log(message.padStart(25, '+'));
console.log(message.padEnd(25, '+'));

const maskCreditCard = function (number) {
  const str = number + '';
  const last = str.slice(-4);

  return last.padStart(str.length, '*');
};

console.log(maskCreditCard(4334466767333355));

// Repeat
const msg = 'Bad Weather... All departure Delayed';
console.log(msg.repeat(5));

//  function convertString(string){
//   const sliced = string.toLowerCase().split('_');

//   const [f , s] = sliced;
//   const camelCase =  s[0].toUpperCase()+ s.slice(1);
//   // console.log(camelCase.join(' '));
//  }

//  convertString('user_name');

// const flights =
// '_Delayed_Departure;fao93766109;txl2133758440;
// 11:25+_Arrival;bru0943384722;fao93766109;11:45+
// _Delayed_Arrival;hel7439299980;fao93766109;12:05
// +_Departure;fao93766109;lis2323639855;12:30';

// console.log(flights.split('+'));

for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');
  const output = `${type.startsWith('_Delayed') ? '🔴' : ''} ${type.replaceAll(
    '_',
    ''
  )} FROM ${from.toUpperCase().slice(0, 3)} TO ${to
    .toUpperCase()
    .slice(0, 3)} (${time.replace(':', 'h')})`.padStart(55);
  console.log(output);
}
