'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const displayDate = `${day}/${month}/${year}`;

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers

// fake always logged in screen
let currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

const now = new Date();
const day = now.getDate();
const month = now.getMonth() + 1;
const year = now.getFullYear();

const hour = now.getHours();
const minute = now.getMinutes();

labelDate.textContent = `${day}/${month}/${year},${hour}:${minute}`;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
console.log(23 === 23.0); // true
console.log(0.1 + 0.2 === 0.3); // false

console.log(Number.parseInt('30px', 10)); // 30
console.log(Number.parseInt('23', 2));

console.log(Number.parseInt('2.5rem')); //2
console.log(Number.parseFloat('2.5rem')); //2.5

console.log(parseFloat('23eee '));

console.log(Number.isNaN(23)); /// true
console.log(Number.isNaN('34')); // false
console.log(Number.isNaN(+'40')); // true
console.log(Number.isNaN(76 / 0)); // false

console.log(Number.isFinite(20)); // true
console.log(Number.isFinite('20')); //  false

// Math.isInteger
// Math.sqrt
// Math.max
// Math.min
// Math.PI
// Math.random()
// Math.trunc
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;
console.log(randomInt(10, 20));

// Rounding iNTERGER
console.log(Math.trunc(23.4));
console.log(Math.round(23.8));
console.log(Math.ceil(23.8));
console.log(Math.floor(23.8));
console.log(Math.trunc(-23.8));
console.log(Math.floor(-23.8));

console.log((3.81).toFixed(0)); // returns string
console.log((+3.81).toFixed(3));
console.log((+3.81).toFixed(4));

// labelBalance.addEventListener('click' , function(){
//   [...document.querySelectorAll('.movements__row')].forEach(function ( row , i){
//     if( i % 2 === 0){
//       row.style.backgroundColor = 'lightorange';
//     }
//   })
// })

const diameter = 287_460_000_000; // Numeric seprators ---- 287460000000
const priceCents = 345_45; // 34545

// BigInt
//It cannot be mixed with other types

console.log(Number.MAX_SAFE_INTEGER);
console.log(Number.MIN_SAFE_INTEGER);
console.log(Number.MAX_VALUE);
console.log(Number.MIN_VALUE);
console.log(Number.EPSILON);
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER));

console.log(3891373498324823423403044354353453454544422300n);
console.log(BigInt(456789013232));
console.log(BigInt(456789013232) + BigInt(456789013232));
console.log(495432434234324n + 334234343242n);

const num = 23;
const hugeNum = 213231232312312n;
console.log(hugeNum + BigInt(num));

// Dates
//creating a date
// const now = new Date();
console.log(now);
console.log(now.getFullYear());
console.log(now.getMonth()); // zero based
console.log(now.getDate());
console.log(now.getDay()); //.4 thrusday
console.log(now.getHours());
console.log(now.getMinutes());
console.log(now.getSeconds());
console.log(now.toISOString()); // 2024-05-02T13:09:19.242Z
console.log(now.toTimeString()); // 18:43:59 GMT+0530 (India Standard Time)

console.log(Date.now()); // Mon Dec 02 2024 06:00:00 GMT+0530 (India Standard Time)

console.log(new Date('May 02 2024 18:29:01'));
console.log(new Date(2024, 11, 2, 6, 0)); // Mon Dec 02 2024 06:00:00 GMT+0530 (India Standard Time)

setTimeout(() => {
  console.log('Hello');
}, 3000);
console.log('waiting...');

const ingredients = ['olives' , ' cheese' , 'spinch']
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`hello ${ing1} and ${ing2}`),
  3000,
  ...ingredients
);
if( ingredients.includes('spinch')) clearTimeout(pizzaTimer);


setInterval(() => {
  const now = new Date();
  console.log(now);
} , 1000)

//count down timer

const startLogOutTimer = function(){
  //set timer to 5 min
  let time = 100;
  const min = String( Math.trunc(time/ 60)).padStart(2, 0);
  const sec = String(time % 60).padStart(2,0);

  // call the timer every second
  const stopWatch= setInterval( function(){
    labelTimer.textContent = `${min} : ${sec}`;

    time--;


  if(time === 0){
    clearInterval(timer);
    labelTimer.textContent = 'Time is up';
    labelTimer.style.color ='red';
    containerApp.style.opacity = 100;
  }
  }, 1000)
  // 

}