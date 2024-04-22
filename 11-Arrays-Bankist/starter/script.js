'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movement) {
  containerMovements.innerHTML = '';
  movement.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
     <div class="movements__row">
      <div class="movements__type movements__type--${type}"> ${
      i + 1
    }  ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>
   `;
    containerMovements.insertAdjacentHTML('afterbegin', html); // Review
  });
};
// displayMovements(account1.movements);

//creating username
// const user = '';
const username = '';
// .toLowerCase()
// .split(' ')
// .map(str => str[0])
// .join('');
// console.log(username);

//creating usernames function
const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(str => str[0])
      .join('');
  });
};
createUserNames(accounts);
// console.log(accounts);
const updateUI = function (acc) {
  // display movements
  displayMovements(acc.movements);
  // display balance
  calDisplayBalance(acc);
  // display summary
  calcDisplaySummary(acc);
};
const calDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, movement) => acc + movement, 0);

  labelBalance.textContent = `${acc.balance}€`;
};
// calDisplayBalance(account1.movements);

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outBalance = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outBalance)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposits => (deposits * acc.interestRate) / 100)
    .filter((dep, i, arr) => {
      console.log(arr);
      return dep >= 1;
    })
    .reduce((acc, dep) => acc + dep, 0);
  labelSumInterest.textContent = `${interest}€`;
};
// calcDisplaySummary(account1.movements);

//Event handlers
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();
  console.log('Login', username);
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log('LOGIn');
    // Display UI and message
    labelWelcome.textContent = `Welcome back,${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    //clear input fileds
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();
    updateUI(currentAccount);
  }
});

//transferAmount
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(amount, receiverAcc);
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    console.log('Tranfer Valid');
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
  } else {
    console.log('Transfer Failed');
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.usernamme === currentAccount.username
    );
    // delete accounts
    accounts.splice(index, 1);
    // hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

// loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //add amount
    currentAccount.movements.push(amount);
    // update Ui
    updateUI(currentAccount);
  }

  inputLoanAmount.value = '';
});
//////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////

let arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

//SLICE === does not change the original array
console.log(arr.slice(2, 5)); // (start index, end index)  ['c', 'd', 'e'] end parameter excluded
console.log(arr.slice(3)); // ['d', 'e', 'f', 'g', 'h']
console.log(arr.slice(-2)); // ['g', 'h'] --> from end
console.log(arr.slice(-1)); // ['h'] -->last element of the array
console.log(arr.slice(1, -2));
console.log(arr.slice()); // making a shallow copy
console.log([...arr]); // same as above

// SPLICE: extracted elements are permanetaly removed from the array
// console.log(arr.splice(2));
// console.log(arr.splice(-1)); delete last element
// console.log(arr.splice(2, 2)); // startindex and number of elements to be removed
// console.log(arr);

//REVERSE : mutates the original array
const arr2 = ['i', 'j', 'n', 'l', 'k'];
console.log(arr2.reverse());

//CONCAT
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

//JOIN
console.log(letters.join(' - '));
console.log(arr[2]);
console.log(arr.at(2));

// getting last element
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));
console.log('aditya'.at(0));

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// MAP -- it is similar to forEach, but it creates a new array.
const euroToUSD = 1.1;
// const movementUSD = movements.map( function(mov){
//   return mov*euroToUSD;
//   // return 23;
// })
const movementUSD = movements.map(mov => mov * euroToUSD);
console.log(movements);
console.log(movementUSD);
// above equivalent
const movementsUSDfor = [];
for (const move of movements) movementsUSDfor.push(move * euroToUSD);

const movementsDescription = movements.map((mov, i, arr) => {
  if (mov > 0) {
    return `MAP Movement ${i + 1} ++You deposited $ ${mov}`;
  } else {
    return `MAP Movement ${i + 1}--You withdraw $ ${Math.abs(mov)}`;
  }
});
//console.log(movementsDescription);

// FILTER -- returns new array,if the condition is true
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
const withdrawals = movements.filter(mov => mov < 0);

//REDUCE --  boils down all elements into a single value.eg- sum of all elements
let balance = movements.reduce(function (sum, element, index, array) {
  console.log(`Ieration ${index} :${element}:ACCUMILATOR ${sum}`);
  return sum + element;
}, 0);

// max value in an array : Reduce
const max = movements.reduce((acc, mov) => {
  return mov > acc ? mov : acc;
}, movements[0]);
//console.log(max);

// Pipeline
const totalDespositsUSD = movements
  .filter(mov => mov > 0)
  // .map(mov => mov * euroToUSD)
  .map((mov, i, arr) => {
    return mov * euroToUSD;
  })
  .reduce((acc, mov) => acc + mov, 0);
//console.log(totalDespositsUSD);

//FIND: returns first occurance of the condition that is true
const firstWithdrawal = movements.find(mov => mov < 0);
//console.log(firstWithdrawal);

console.log(accounts);
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
//console.log(account);

// for (const movement of movements) {
// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1}++You deposited $ ${movement}`);
//   } else {
//     console.log(`Movement ${i + 1}--You withdraw $ ${Math.abs(movement)}`);
//   }
// }
/// forEach
//no break or continue allowed
movements.forEach(function (movement, index, array) {
  // order of agruments matters
  if (movement > 0) {
    console.log(`Movement ${index + 1} ++You deposited $ ${movement}`);
  } else {
    console.log(`Movement ${index + 1}--You withdraw $ ${Math.abs(movement)}`);
  }
});

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (val, key, map) {
  console.log(`${key} ${val}`);
});

const currenciesUnique = new Set(['USD', 'EUR', 'GBP', 'Pound', 'USD']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});

console.log(movements);
// includes checks only for equality
console.log(movements.includes(-130)); // returns true

//SOME : checks condition
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits); // true

// EVERY: return true if all the elements satifies the condition
const everyDeposits = movements.some(mov => mov > 0);
console.log(everyDeposits); // false

// seperate call back
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

//FLAT
const arr3 = [[1, 2, 3], 4, 5, [6, 7], 8];
console.log(arr3.flat()); // [1, 2, 3, 4, 5, 6, 7, 8]

const arr4 = [[1, [2, 3]], 4, 5, [6, [7]], 8];
console.log(arr4.flat()); //[1, [2,3], 4, 5, 6, [7], 8]  cleans only one level
console.log(arr4.flat(2)); // [1, 2, 3, 4, 5, 6, 7, 8]

const allAccountsMovements = accounts.map(acc => acc.movements);
console.log(allAccountsMovements);
console.log(allAccountsMovements.flat());
const overallBalance = allAccountsMovements.flat().reduce((acc, mov) => acc + mov,0);
console.log(overallBalance);

//FlatMAP
const overallBal = accounts.flatMap( acc=> acc. movements).reduce((acc, mov) => acc + mov,0)
console.log(overallBal);

// coding challenge
const checkDogs = function (arr1, arr2) {
  const dogsJuliaCorrected = arr1.slice(); // copied  array
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);
  // console.log(dogsJuliaCorrected);
  const dogs = dogsJuliaCorrected.concat(arr2);
  // console.log(dogs);

  dogs.forEach(function (dog, i) {
    if (dog >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and  is ${dog} years old.`);
    } else {
      console.log(`Dog number ${i + 1} is a Puppy.`);
    }
  });
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  const adultAges = humanAges.filter(age => age >= 18);

  const avg = adultAges.reduce((acc, age) => acc + age, 0) / adultAges.length;
  console.log('Human Age', humanAges);
  console.log('Adult', adultAges);
  // console.log('Average Age',avg);
  return avg;
};

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
