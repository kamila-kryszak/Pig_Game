'use strict';

// Selecting elements
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

let score0Element = document.querySelector('#score--0');
let score1Element = document.querySelector('#score--1');
let diceElement = document.querySelector(".dice");

let current0Element = document.querySelector('#current--0');
let current1Element = document.querySelector('#current--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions setup
score0Element.textContent = 0;
score1Element.textContent = 0;
diceElement.classList.add('hidden');

const scores = [];
let currentScore = 0;
let activePlayer = 0;


// Rolling dice functionality
btnRoll.addEventListener('click', function () {
    // 1. Generating a random dice roll 
    const diceNr = Math.floor((Math.random() * 6) + 1);

    // 2. Display dice 
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${diceNr}.png`;

    // 3. Check for rolled 1
    if (diceNr !== 1) {
        // Add dice to the current score
        currentScore += diceNr;
        document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
    } else {
        // Switch to the next player
        document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        currentScore = 0;
        activePlayer = activePlayer === 0 ? 1 : 0;
        player0Element.classList.toggle('player--active');
        player1Element.classList.toggle('player--active');
    }

});