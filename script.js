'use strict';
// Score texts
let player0ScoreElement = document.querySelector('#score--0');
let player1ScoreElement = document.querySelector('#score--1');

let player0CurrentScoreElement = document.querySelector('#current--0');
let player1CurrentScoreElement = document.querySelector('#current--1');

// buttons
let newGameButton = document.querySelector('.btn--new');
let rollDiceButton = document.querySelector('.btn--roll');
let holdButton = document.querySelector('.btn--hold');

// Dice images
let diceElement = document.querySelector('.dice');

let activePlayer = 0;
let scores = [0, 0];
let currentScore = 0;
let gameOver = false;
let pending = false;

function updateScore() {
  player0ScoreElement.textContent = scores[0];
  player1ScoreElement.textContent = scores[1];
}

updateScore();

diceElement.classList.add('dice-hidden');

function switchPlayer() {
  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
}

rollDiceButton.addEventListener('click', function () {
  if (gameOver === false && pending === false) {
    diceElement.classList.remove('dice-hidden');
    //Generate random dice roll
    const randomDiceNumber = Math.trunc(Math.random() * 6) + 1;
    console.log(
      '🚀 ~ file: script.js ~ line 29 ~ rolldiceButton.addEventListener ~ randomDiceNumber',
      randomDiceNumber
    );

    pending = true;

    // Show dice
    $('.dice').effect('shake');
    setTimeout(function () {
      const diceImageName = 'dice-' + randomDiceNumber + '.png';
      diceElement.src = diceImageName;
      if (randomDiceNumber !== 1) {
        currentScore += randomDiceNumber;
        document.getElementById(`current--${activePlayer}`).textContent =
          currentScore;
      } else {
        currentScore = 0;
        document.getElementById(`current--${activePlayer}`).textContent =
          currentScore;
        switchPlayer();
      }
      pending = false;
    }, 500);
  }
});

holdButton.addEventListener('click', function () {
  if (gameOver === false) {
    scores[activePlayer] += currentScore;
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
    updateScore();
    if (scores[activePlayer] >= 100) {
      gameOver = true;
      document.getElementById(`name--${activePlayer}`).textContent = 'WINNER!';
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      diceElement.classList.add('dice-hidden');
    } else {
      switchPlayer();
    }
  }
});

newGameButton.addEventListener('click', function () {
  activePlayer = 0;
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;
  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;
  updateScore();
  diceElement.classList.add('dice-hidden');
  document.getElementById('name--0').textContent = 'Player 1';
  document.getElementById('name--1').textContent = 'Player 2';
  gameOver = false;
  pending = false;
});

// Modal dialog
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
