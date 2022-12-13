import './style/style.scss';

import { shuffle, showElement, hideElement } from './utils';

import initialQuestions from './questionArray';

/*
 * skapa en funktion som slumpar fram frågor och svarsalternativ
 * skapa en funktion som visar om svaret är rätt eller fel
 * skapa en funktion som visar poäng
 * skapa en funktion som visar hur många frågor som är kvar
 * skapa en timer-funktion
 * skapa highscore-funktion
 * skapa en funktion som gör det möjligt att flera svarsalternativ kan vara rätt
 * skapa high-score med 10 platser lagrat i local storage
 * skapa en maxtid med nedräkning
 * skapa en timer-funkton som ger olika poäng beroende på hur lång tid det tar att svara
 * skapa en knapp som visar alla svar med rätt och fel
 */

// Variabler

const gameDescription = document.getElementById('gameDescription');
const questionTextDiv = document.getElementById('question-text');
const startGameButton = document.getElementById('start-game-button');
const restartGameButton = document.getElementById('restart-game-button');
const gameOverText = document.getElementById('gameOver');

let currentQuestion = 0;
let points = 0;
let questions = shuffle(initialQuestions);
let playerName = '';

// Eventlyssnare

startGameButton.addEventListener('click', startGame);
restartGameButton.addEventListener('click', restartGame);

// Funktioner

function startGame() {
  const playerNameInput = document.getElementById('playerNameInput');
  const playerDetails = document.getElementById('player-details');
  const questionContainer = document.getElementById('questionContainer');
  // Spara spelarens namn
  playerName = playerNameInput.value;
  // Dölj HTML-elementen
  hideElement(gameDescription);
  hideElement(playerDetails);
  // Visa HTML-elementen
  showElement(questionContainer);

  nextQuestion();
}

function checkAnswer(event) {
  // vilket svarsalternativ användaren tryckt på
  const userAnswer = event.currentTarget.innerHTML;
  // vilket svarsalternativ som är rätt
  const correctAnswer = questions[currentQuestion - 1].correctAnswer;

  if (userAnswer === correctAnswer) {
    // ge ett poäng!
    points++;
  } else {
    // ge minus
    points--;
  }
  nextQuestion();
}

function nextQuestion() {
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
    answerContainer.innerHTML += `<button class="answer-button">${answer}</button>`;
  });
  const answerButtons = document.querySelectorAll('.answer-button');
  answerButtons.forEach(button => {
    button.addEventListener('click', checkAnswer);
  });

  currentQuestion++;
}

function restartGame() {
  const questionContainer = document.getElementById('questionContainer');
  hideElement(gameOverText);
  showElement(questionContainer);
  currentQuestion = 0;
  points = 0;
  nextQuestion();
}

function gameOver() {
  const questionContainer = document.getElementById('questionContainer');
  const pointsContainer = document.getElementById('pointsContainer');
  pointsContainer.innerHTML = `Du fick ${points} poäng!`;
  showElement(gameOverText);
  hideElement(questionContainer);
}
