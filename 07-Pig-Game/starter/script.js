'use strict';

let score0El = document.querySelector('#score--0'); //line 11
let score1El = document.getElementById('score--1'); // to select element by id(alternate way)
let diceEl = document.querySelector('.dice');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = function () {
  // Starting conditions
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  currentScore = 0;
  activePlayer = 0; // 0 for P1 and 1 for P2 : Reason - score stored in array
  scores = [0, 0];
  playing = true;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; // reassigning active player
  // if (activePlayer === 0) then new activePlayer = 1
  // else activePlayer = 0
  player0El.classList.toggle('player--active'); // for styling  toggle: hide class if seen
  player1El.classList.toggle('player--active'); // And add class if hidden
};

//rolling dice functinality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1) Generate a random number(dice roll)
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2) Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`; // change dice image

    // 3) check for 1
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; // the score element dynamically based on which is the active player
      //current0El.textContent = currentScore;
    } else {
      //switch to other player
      switchPlayer();
    }
  }
});

// Hold button
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1) Add current score to active player's Score
    scores[activePlayer] += currentScore; // scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2) Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // true = finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
    // else swtich the player
    else {
      switchPlayer();
    }
  }
});

// new game button : resetting the game
btnNew.addEventListener('click', init);
