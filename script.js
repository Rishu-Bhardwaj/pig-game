'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let playing = true;
let activePlayer = 0;
let currentScore = 0;
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
const score = [0, 0];

const getActiveScore = () => {
  if (activePlayer === 0) return score0El;
  else return score1El;
};
const getCurrentElement = () => {
  if (activePlayer === 0) return current0El;
  else return current1El;
};
const getCurrentPlayer = () => {
  if (activePlayer === 0) return player0El;
  else return player1El;
};
const reverseActivePlayer = () => {
  if (activePlayer === 0) activePlayer = 1;
  else activePlayer = 0;
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      getCurrentElement().textContent = currentScore;
    } else {
      currentScore = 0;
      getCurrentElement().textContent = 0;
      getCurrentPlayer().classList.remove('player--active');
      reverseActivePlayer();
      getCurrentPlayer().classList.add('player--active');
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentScore;
    getActiveScore().textContent = score[activePlayer];
    currentScore = 0;
    getCurrentElement().textContent = 0;
    if (score[activePlayer] >= 100) {
      getCurrentPlayer().classList.add('player--winner');
      getCurrentPlayer().classList.remove('player--active');
      playing = false;
      diceEl.classList.add('hidden');
    } else {
      getCurrentPlayer().classList.remove('player--active');
      reverseActivePlayer();
      getCurrentPlayer().classList.add('player--active');
    }
  }
});

btnNew.addEventListener('click', function () {
  score[0] = score[1] = 0;
  currentScore = 0;
  getCurrentPlayer().classList.remove('player--winner');
  diceEl.classList.add('hidden');
  if (activePlayer === 1) player1El.classList.remove('player--active');
  score0El.textContent = score1El.textContent = 0;
  current0El.textContent = current1El.textContent = 0;
  player0El.classList.add('player--active');
  activePlayer = 0;
  playing = true;
});
