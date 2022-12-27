import './style/style.scss';

import { shuffle, showElement, hideElement } from './utils';

import initialQuestions from './questionArray';

/*
 * skapa en funktion som visar hur många frågor som är kvar
 */

// Variabler

const gameDescription = document.getElementById('game-description');
const questionTextDiv = document.querySelector('.question-text');
const startGameButton = document.querySelector('.start-game-button');
const restartGameButton = document.querySelector('.restart-game-button');
const gameOverText = document.querySelector('.game-over');
const nextQuestionButton = document.querySelector('.next-question-button');
const highscoreButtons = document.querySelectorAll('.highscore-button');
const questionContainer = document.querySelector('.question-container');
const playerDetails = document.querySelector('.player-details');
const quizContainer = document.querySelector('.quiz-container');
const highscoreContainer = document.querySelector('.highscore-container');
const highscoreList = document.querySelector('.highscore-list');
const backButton = document.querySelector('.back-button');
const showResultButton = document.querySelector('.show-result-button');
const resultPage = document.querySelector('.result-page');
const userAnswers = {};

let currentQuestion = 0;
let points = 0;
let questions = shuffle(initialQuestions);
let playerName = '';
let userAnswer = '';
let timerNextQuestion = null;
let timerGameOver = null;
let questionCounter = 60;
let interval = null;

// Eventlyssnare

startGameButton.addEventListener('click', startGame);
restartGameButton.addEventListener('click', restartGame);
nextQuestionButton.addEventListener('click', nextQuestion);
highscoreButtons.forEach(button => button.addEventListener('click', highscore));
backButton.addEventListener('click', showStartPage);
showResultButton.addEventListener('click', showResult);

// Funktioner

function showStartPage() {
  hideEverything();
  showElement(quizContainer);
}

function startGame() {
  const playerNameInput = document.getElementById('playerNameInput');
  const fiveMinutes = 5 * 60 * 1000;
  startCountDown(fiveMinutes);
  timerGameOver = setTimeout(gameOver, fiveMinutes);
  playerName = playerNameInput.value;
  hideElement(gameDescription);
  hideElement(playerDetails);
  showElement(questionContainer);

  displayQuestion();
}

function startCountDown(milliseconds) {
  let counter = milliseconds / 1000;
  const gameTimer = document.querySelector('.timer-gameover');
  gameTimer.innerHTML = Math.floor(counter / 60) + ':' + (counter % 60).toString().padStart(2, '0');
  counter--;
  const interval = setInterval(() => {
    gameTimer.innerHTML = Math.floor(counter / 60) + ':' + (counter % 60).toString().padStart(2, '0');
    counter--;
    if (counter < 0) {
      clearInterval(interval);
    } else if (counter < 30) {
      gameTimer.style.color = 'red';
    }
  }, 1000);
}

function questionTimer() {
  interval = setInterval(() => {
    questionCounter--;
    if (questionCounter < 0) {
      nextQuestion();
    }
  }, 1000);
}

function checkAnswer() {
  const correctAnswer = questions[currentQuestion].correctAnswer;
  const isCorrect = isAnswerCorrect(correctAnswer, userAnswer);

  if (isCorrect) {
    points += 1;

    if (questionCounter >= 50) {
      points += 5;
    } else if (questionCounter >= 40) {
      points += 3;
    } else if (questionCounter >= 30) {
      points += 1;
    }
  } else {
    points -= 1;
  }
}

function setAnswer(event) {
  const correctAnswer = questions[currentQuestion].correctAnswer;
  if (typeof correctAnswer === 'object') {
    userAnswer = [];
    const checkedAnswers = document.querySelectorAll('input:checked');
    checkedAnswers.forEach(answer => {
      userAnswer.push(answer.nextSibling.textContent);
    });
  } else {
    userAnswer = event.currentTarget.nextSibling.textContent;
  }
  if (timerNextQuestion === null) {
    timerNextQuestion = setTimeout(nextQuestion, 5000);
  }
}

function displayQuestion() {
  if (currentQuestion >= questions.length) {
    gameOver();
    return;
  }

  const answerContainer = document.querySelector('.answer-container');
  const question = questions[currentQuestion];
  const answers = shuffle(question.answerOptions);
  const correctAnswer = questions[currentQuestion].correctAnswer;

  questionTextDiv.classList.remove('easy', 'medium', 'hard');
  switch (question.category) {
    case 'Lätt':
      questionTextDiv.classList.add('easy');
      break;
    case 'Medel':
      questionTextDiv.classList.add('medium');
      break;
    case 'Svår':
      questionTextDiv.classList.add('hard');
      break;
  }

  questionTextDiv.innerHTML = questions[currentQuestion].questionText;
  answerContainer.innerHTML = '';

  // Använder anonyma funktioner här pga finns endast här.
  if (typeof correctAnswer === 'object') {
    answers.forEach(answer => {
      answerContainer.innerHTML += `<div class="button">
      <input type="checkbox" name="answerButton" class="answer-button"><label>${answer}</label>
      </div>`;
    });
  } else {
    answers.forEach(answer => {
      answerContainer.innerHTML += `<div class="button">
    <input type="radio" name="answerButton" class="answer-button"><label>${answer}</label>
    </div>`;
    });
  }
  const answerButtons = document.querySelectorAll('.answer-button');
  answerButtons.forEach(button => {
    button.addEventListener('change', setAnswer);
  });
  questionCounter = 60;
  questionTimer();
}

function nextQuestion() {
  clearInterval(interval);
  clearTimeout(timerNextQuestion);
  timerNextQuestion = null;
  checkAnswer();
  userAnswers[currentQuestion] = userAnswer;
  userAnswer = '';
  currentQuestion++;
  displayQuestion();
}

function restartGame() {
  hideElement(gameOverText);
  showElement(questionContainer);
  currentQuestion = 0;
  points = 0;
  startGame();
}

function gameOver() {
  const pointsContainer = document.getElementById('pointsContainer');
  clearTimeout(timerGameOver);
  pointsContainer.innerHTML = `Du fick ${points} poäng!`;

  const highscore = JSON.parse(localStorage.getItem('highscore')) ?? [];
  const scores = highscore.map(record => record.score);
  const lowestScore = Math.min(...scores);

  if (points > lowestScore || highscore.length < 10) {
    const newHighscore = [...highscore, { name: playerName, score: points }].sort((a, b) => b.score - a.score);

    if (newHighscore.length > 10) {
      newHighscore.pop();
    }

    localStorage.setItem('highscore', JSON.stringify(newHighscore));
  }

  showElement(gameOverText);
  hideElement(questionContainer);
}

function isAnswerCorrect(userAnswer, correctAnswer) {
  return typeof correctAnswer === 'object'
    ? correctAnswer.every(item => userAnswer.includes(item)) && userAnswer.every(item => correctAnswer.includes(item))
    : userAnswer === correctAnswer;
}

function showResult() {
  hideEverything();
  showElement(resultPage);
  const resultContainer = document.querySelector('.result-container');
  resultContainer.innerHTML = questions
    .map((question, i) => {
      const isCorrect = isAnswerCorrect(userAnswers[i], question.correctAnswer);

      return `
    <div class="result">
      <div class="result-question">${question.questionText}</div>
      <div class="result-answer">
        <div class="result-answer-text">${userAnswers[i]}${isCorrect ? '✔️' : '❌'}</div>  
      </div>
    </div>
  `;
    })
    .join('');
}

function hideEverything() {
  hideElement(gameOverText);
  hideElement(quizContainer);
  hideElement(highscoreContainer);
  hideElement(backButton);
}

function highscore() {
  hideEverything();
  showElement(highscoreContainer);
  const highscore = JSON.parse(localStorage.getItem('highscore')) ?? [];

  highscoreList.innerHTML = highscore
    .map(
      (record, i) => `
    <div class="highscore-record">
      <span>${i + 1}. ${record.name}</span> <span>${record.score} p</span>
    </div>
  `
    )
    .join('');
  showElement(backButton);
}
