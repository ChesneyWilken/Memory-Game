/*
 * Create a list that holds all of your cards */

const allIcons= [...document.querySelectorAll('.card > i')];



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


const shuffleDeck = [...document.querySelectorAll('.card')];
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// function to reset the game

const newGame = document.querySelector('.restart');

const resetGame = function() {
//  timer stop & reset
    stopTimer();

//  move counter stop & reset
    moveReset();
// reset stars
  const starPanel = document.querySelector('.stars');
  let starScore = document.getElementsByClassName('fa fa-star');

  for (; starScore.length < 3 ;) {
    const star_li = document.createElement('li');
    const starIcon = document.createElement('i');
    starIcon.setAttribute('class', 'fa fa-star');
    star_li.appendChild(starIcon);
    starPanel.appendChild(star_li);
  }


// reset cards
 for (i = 0; i < allCards.length; i++) {
   shuffleDeck[i].classList.remove('match','open', 'show');
 };
 shuffle(allIcons);
 const shuffleList =  document.querySelector('.deck > li');
 for (i = 0; i < allCards.length; i++) {
   allCards[i].appendChild(allIcons[i]);
 }
 // empty match array
  match = []
}

newGame.addEventListener('click', resetGame);


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open' cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// Document on load functions
window.addEventListener("DOMContentLoaded", function(e) {
  for (i = 0; i < allCards.length; i++) {
    allCards[i].classList.remove('match','open', 'show');
  };
  shuffle(allIcons);
  const shuffleList =  document.querySelector('.deck > li');
  for (i = 0; i < allCards.length; i++) {
    allCards[i].appendChild(allIcons[i]);
  }
});

//vars for openCards function
const deck = document.getElementsByClassName('deck')[0];

const allCards = document.querySelectorAll('.card');
let openCards = [];
let match = [];
let timerStart = false;
// open cards function
const flipCard = function cardFlip(){

  if (!event.target.classList.contains('open') && !event.target.classList.contains('match') && !event.target.classList.contains('fa') && !event.target.classList.contains('deck') && openCards.length < 2) {

    openCards.push(event.target);

    event.target.classList.add('open', 'show');
    moveCounter();


    
    if (openCards.length === 1) {
      // cards will now close after a short delay to increase difficulty.
      setTimeout(function() {
        for (i = 0; i < openCards.length; i++) {
          openCards[i].classList.remove('open','show');
      }
      openCards = [];
    }, 800);

    } else if (openCards.length === 2 && openCards[0].innerHTML === openCards[1].innerHTML) {

      for (i = 0; i < openCards.length; i++) {
        match.push(openCards[i]);
        openCards[i].classList.remove('open', 'show');
        openCards[i].classList.add('match');
        if (match.length === 16) {
          clearInterval(timeCount);
          setTimeout(function() { displayMessage()}, 500);
        }
      }
      openCards = [];
    
    } else if (openCards.length === 2 && openCards[0].innerHTML !== openCards[1].innerHTML) {

          // if no match hide
          setTimeout(function() {
            for (i = 0; i < openCards.length; i++) {
              openCards[i].classList.remove('open','show');
          }
          openCards = [];
        }, 100); // reduced time to increase difficulty 

    }
  }
}

// timer function start
let timeCount;
let sec = 0, min = 0;
let timer = function(){
  if (count === 0 && timerStart === false) {
    timerStart = true;
    timeCount = setInterval(function(){
    sec++

    if (sec === 60) {
      sec = 0;
      min++;
    }

    box.innerText = `Timer: ${formatTime(min)} : ${formatTime(sec)}`
    },1000);
  }
}

function formatTime(unit) {
  if (unit < 10) {
    return `0${unit}`
  } else {
    return `${unit}`
  }
}

// vars for timer function
const scorePanel = document.querySelector('.score-panel');
let count = 0;
const box = document.createElement('span');
box.setAttribute('class', 'timer');
scorePanel.appendChild(box);
box.innerText = `Timer: ${formatTime(min)} : ${formatTime(sec)}`;

//stop timer function
const stopTimer = function stop(){
  clearInterval(timeCount);
  count = 0;
  timerStart = false;
  box.innerHTML = 'Timer : ' + count;
}

const startGame = function start() {
  flipCard();
  timer();
}

deck.addEventListener('click', startGame);

//move counter
let moves = 0;
let displayStars = 3;
const moveSpan = document.querySelector('.moves');
moveSpan.innerHTML = 'Moves: ' + moves;

const moveCounter = function moveCount() {
  if (openCards.length === 2) {
    moves = moves + 1;
    moveSpan.innerHTML = 'Moves: ' + moves;
    if (moves === 15) {
      removeStar();
      displayStars = 2;
    }
    if (moves === 20) {
      removeStar();
      displayStars = 1;
    }
  }
}

const moveReset = function(){
  moves = 0;
  moveSpan.innerHTML = 'Moves: ' + moves;
}

// star star rating function

const removeStar = function(){
  const stars = document.getElementsByClassName('stars');
  const icon = document.querySelector('.fa-star');
    icon.parentElement.removeChild(icon);
}


// game won message

function displayMessage() {
  const container = document.querySelector('.container');

  const panel = document.createElement('div');
  panel.setAttribute('class', 'msgBox');
  container.appendChild(panel);

  const msg = document.createElement('p');
  msg.innerText =`Congratulations, your final time was ${formatTime(min)} : ${formatTime(sec)} seconds`;
  panel.appendChild(msg);

  const playAgain = document.createElement('button');
  playAgain.textContent = 'Play Again!';
  panel.appendChild(playAgain);

  playAgain.onclick = function() {
    resetGame();
  panel.parentNode.removeChild(panel);
  }
}
