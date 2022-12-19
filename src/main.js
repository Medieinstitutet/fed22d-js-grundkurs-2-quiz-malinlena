import './style/style.scss';

import { shuffle, showElement, hideElement } from './utils';

import initialQuestions from './questionArray';

/*
 * skapa en funktion som visar hur många frågor som är kvar
 * skapa en funktion som gör det möjligt att flera svarsalternativ kan vara rätt
 * skapa en maxtid med nedräkning
 * skapa en timer-funkton som ger olika poäng beroende på hur lång tid det tar att svara
 * skapa en knapp som visar alla svar med rätt och fel
 */

// Variabler

const gameDescription = document.getElementById('game-description');
const questionTextDiv = document.getElementById('question-text');
const startGameButton = document.getElementById('start-game-button');
const restartGameButton = document.getElementById('restart-game-button');
const gameOverText = document.getElementById('game-over');
const nextQuestionButton = document.getElementById('next-question-button');
const highscoreButtons = document.querySelectorAll('.highscore-button');
const questionContainer = document.getElementById('question-container');
const playerDetails = document.getElementById('player-details');
const quizContainer = document.getElementById('quiz-container');
const highscoreContainer = document.getElementById('highscore-container');
const highscoreList = document.getElementById('highscore-list');

let currentQuestion = 0;
let points = 0;
let questions = shuffle(initialQuestions);
let playerName = '';
let userAnswer = '';
let timerNextQuestion = null;
let timerGameOver = null;

// Eventlyssnare

startGameButton.addEventListener('click', startGame);
restartGameButton.addEventListener('click', restartGame);
nextQuestionButton.addEventListener('click', nextQuestion);
highscoreButtons.forEach(button => button.addEventListener('click', highscore));

// Funktioner

function startGame() {
  const playerNameInput = document.getElementById('playerNameInput');
  timerGameOver = setTimeout(gameOver, 5 * 60 * 1000);
  // Spara spelarens namn
  playerName = playerNameInput.value;
  // Dölj HTML-elementen
  hideElement(gameDescription);
  hideElement(playerDetails);
  // Visa HTML-elementen
  showElement(questionContainer);

  displayQuestion();
}

function checkAnswer() {
  // vilket svarsalternativ som är rätt
  const correctAnswer = questions[currentQuestion].correctAnswer;

  if (userAnswer === correctAnswer) {
    // ge ett poäng!
    points++;
  } else {
    // ge minus
    points--;
  }
}

function setAnswer(event) {
  userAnswer = event.currentTarget.nextSibling.textContent;
  if (timerNextQuestion === null) {
    timerNextQuestion = setTimeout(nextQuestion, 5000);
  }
}

function displayQuestion() {
  if (currentQuestion >= questions.length) {
    gameOver();
    return;
  }

  const answerContainer = document.getElementById('answer-container');
  const question = questions[currentQuestion];
  const answers = shuffle(question.answerOptions);

  questionTextDiv.innerHTML = questions[currentQuestion].questionText;
  answerContainer.innerHTML = '';

  // Använder anonyma funktioner här pga finns endast här.
  answers.forEach(answer => {
    answerContainer.innerHTML += `<div class="button">
    <input type="radio" name="answerButton" class="answer-button"><label>${answer}</label>
    </div>`;
  });
  const answerButtons = document.querySelectorAll('.answer-button');
  answerButtons.forEach(button => {
    button.addEventListener('change', setAnswer);
  });
}

function nextQuestion() {
  clearTimeout(timerNextQuestion);
  timerNextQuestion = null;
  checkAnswer();
  currentQuestion++;
  displayQuestion();
}

function restartGame() {
  const questionContainer = document.getElementById('question-container');
  hideElement(gameOverText);
  showElement(questionContainer);
  currentQuestion = 0;
  points = 0;
  startGame();
}

function gameOver() {
  const questionContainer = document.getElementById('question-container');
  const pointsContainer = document.getElementById('pointsContainer');
  clearTimeout(timerGameOver);
  pointsContainer.innerHTML = `Du fick ${points} poäng!`;

  const highscore = JSON.parse(localStorage.getItem('highscore')) ?? [];
  console.log('highscore', highscore);
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

function hideEverything() {
  hideElement(gameOverText);
  hideElement(quizContainer);
}

function highscore() {
  hideEverything();
  showElement(highscoreContainer);
  const highscore = JSON.parse(localStorage.getItem('highscore')) ?? [];

  highscoreList.innerHTML = highscore
    .map(
      (record, i) => `
    <div>
      ${i + 1}. ${record.name} ${record.score}
    </div>
  `
    )
    .join('');
}
