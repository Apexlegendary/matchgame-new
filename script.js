level = 1;
const cards = document.querySelectorAll('.memory-card');//selects all cards
const button = document.querySelector('button')
button.onclick = () => {window.location.reload();}

let hasFlippedCard = false; // current status is normal
let lockBoard = false; // locks the board - used as a way that makes sure that a seleceted pair that is wrong has enough time to reset before it can crash the game.
let firstCard, secondCard;  // this how we diffrentiate the pair

function flipCard() {
  if (lockBoard) return; // currently is fine
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {

  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework; // if both equal to each other
  isMatch ? disableCards() : unflipCards(); // will stop the correct match and leave it - unflip cards will run alloing the cards to get unflipped if it is wrong
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {  // returns to original board
  [hasFlippedCard, lockBoard] = [false, false];  // returns to original board
  [firstCard, secondCard] = [null, null];  // returns to original board
}

(function shuffle() { //random position
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));


