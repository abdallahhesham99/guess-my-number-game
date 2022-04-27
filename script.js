'use strict';
//Declare variables
let number = document.querySelector('.number');
let message = document.querySelector('.message');
let scoreSpan = document.querySelector('.score');
let highscoreSpan = document.querySelector('.highscore');
let checkButton = document.querySelector('.btn.check');
let againButton = document.querySelector('.btn.again');

let score = 20;

let highscore;

function displayMessage(messageParam) {
  message.textContent = messageParam;
}

//if in local storage item name => highscore set its value to highscore variable
//else==> highscore variable = 0
if (localStorage.getItem('highscore')) {
  highscore = JSON.parse(localStorage.getItem('highscore'));
  highscoreSpan.textContent = highscore;
} else {
  highscore = 0;
}
//to generate random number between 1 and 20
let secretNumber = Math.trunc(Math.random() * 20) + 1;

checkButton.addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  //if guess === false
  if (!guess) {
    displayMessage('⛔ No Number ');

    //if guess === secretnumber
  } else if (guess === secretNumber) {
    //display secretNumber(random number) in number box
    number.textContent = secretNumber;
    // set disabled attr to guess input to stop user to add other number without click on again button
    document.querySelector('.guess').setAttribute('disabled', true);
    //print in message
    displayMessage('Correct Number 🎉🎊');
    //set Win color
    document.body.style.backgroundColor = '#60b347';
    //set borderRadius
    number.style.borderRadius = '50%';

    //condtion for save highscore in span
    if (score > highscore) {
      highscore = score;
      highscoreSpan.textContent = highscore;
      localStorage.setItem('highscore', JSON.stringify(highscore));
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? 'High Number 📈' : 'low Number 📉');
      //decrease score when guessed num is wrong
      score--;
      scoreSpan.textContent = score;
      //score smaller than 1 === All attempts are exhausted
    } else {
      scoreSpan.textContent = 0;
      displayMessage('You lost the game 💥💢');
      document.body.style.backgroundColor = 'rgb(161 22 0)';
    }
  }
});

//again button
againButton.addEventListener('click', function () {
  //reassign new random number
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  //Restore the initial value
  score = 20;
  //print current score number to score title
  scoreSpan.textContent = score;
  //restore default message
  displayMessage(`Start guessing...`);
  //set empty value to guess input
  document.querySelector('.guess').value = '';
  //remove disabled attr from guess input
  document.querySelector('.guess').removeAttribute('disabled');

  //Restore the initial value
  number.textContent = '?';
  //remove circle
  number.style.borderRadius = '0%';
  //restore the original background color
  document.body.style.backgroundColor = '#222';
});
