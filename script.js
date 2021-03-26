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

let scores, currentScore, activePlayer, playing;

const init = function () {
    score0Element.textContent = 0;
    score1Element.textContent = 0;
    current0Element.textContent = 0;
    current1Element.textContent = 0;
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    player0Element.classList.remove('player--winner');
    player1Element.classList.remove('player--winner');
    player0Element.classList.add('player--active');
    player1Element.classList.remove('player--active');
    diceElement.classList.add('hidden');
}

init();


const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0Element.classList.toggle('player--active');
    player1Element.classList.toggle('player--active');
};


// Rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
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
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        // 1. Add current score to active player's score 
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        // 2. Check if player's score is >= 100. If so, end the game

        if (scores[activePlayer] >= 100) {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceElement.classList.add('hidden');
        } else {
            // 3. Switch to the next player
            switchPlayer();
        }
    }
});


btnNew.addEventListener('click', init);