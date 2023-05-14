'use strict';


const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;


const init = function() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0.textContent = 0;
    score1.textContent = 0;
    current0.textContent = 0;
    current1 .textContent = 0;

    diceEl.classList.add('hidden');
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
}
init();

//
const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player-active');
    player1.classList.toggle('player-active');
};

//

btnRoll.addEventListener('click', function() {
    if (playing) {
        // generating a random dice roll
        const dice = Math.trunc(Math.random() *6) + 1;
        console.log(dice);
        // display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        if(dice !== 1) {
            currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function() {
    if (playing) {
        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        // scores[1] = scores[1] + currentScore
    
        document.getElementById(`score--${activePlayer}`).textContent =
          scores[activePlayer];
    
        // 2. Check if player's score is >= 100
        if (scores[activePlayer] >= 100) {
          // Finish the game
          playing = false;
          diceEl.classList.add('hidden');
    
          document
            .querySelector(`.player--${activePlayer}`)
            .classList.add('player--winner');
          document
            .querySelector(`.player--${activePlayer}`)
            .classList.remove('player--active');
        } else {
          // Switch to the next player
          switchPlayer();
        }
      }

    
    
});

btnNew.addEventListener('click', init);