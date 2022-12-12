import './style/style.scss';

// All kod härifrån och ner är bara ett exempel för att komma igång

// I denna utils-fil har vi lagrat funktioner som ofta används, t.ex. en "blanda array"-funktion
import { shuffle } from './utils';

// I denna fil har vi lagrat vår "data", i detta exempel en ofullständig kortlek
import initialQuestions from './questionArray';

/*
 * definiera frågor och svarsalternativ och rätta svar
 * ge funktionalitet till knappen för nästa fråga
 * ge funktionalitet till spela-igen-knappen
 * skapa en funktion som slumpar fram frågor och svarsalternativ
 * skapa en funktion som kollar om svaret är rätt
 * skapa en funktion som visar om svaret är rätt eller fel
 * skapa en funktion som visar poäng
 * skapa en funktion som visar hur många frågor som är kvar
 * skapa en timer-funktion
 * skapa en funktion som räknar poängen
 * skapa highscore-funktion
 * skapa en funktion som gör det möjligt att flera svarsalternativ kan vara rätt
 * skapa high-score med 10 platser lagrat i local storage
 * skapa en maxtid med nedräkning
 * skapa en timer-funkton som ger olika poäng beroende på hur lång tid det tar att svara
 * skapa en knapp som visar alla svar med rätt och fel
 */

const gameDescText = 'Välkommen till musikquizet!';
const gameDescription = document.querySelector('#gameDescription');

gameDescription.innerHTML = gameDescText;

document.querySelector('#startGameBtn').addEventListener('click', startGame);

let playerName = '';

function startGame() {
  console.log('startGame');
  // Spara spelarens nick
  playerName = document.querySelector('#playerNameInput').value;

  // Dölj HTML-elementen
  gameDescription.style.display = 'none';
  document.querySelector('#playerDetails').style.display = 'none';

  nextQuestion();
}

const questionTextDiv = document.querySelector('#questionText');
const answer1Btn = document.querySelector('#answer1');
const answer2Btn = document.querySelector('#answer2');
const answer3Btn = document.querySelector('#answer3');

answer1Btn.addEventListener('click', checkAnswer);
answer2Btn.addEventListener('click', checkAnswer);
answer3Btn.addEventListener('click', checkAnswer);

let currentQuestion = 0;
let points = 0;
let questions = shuffle(initialQuestions);

function checkAnswer(e) {
  const userAnswer = e.currentTarget.innerHTML; // vilket svarsalternativ
  // vilken som är den aktuella frågan
  //varför -1: - 1 för att vi i nextQuestion har redan "gått vidare" till nästa fråga
  // så vi vill ha rätt svar för föregående fråga
  const correctAnswer = questions[currentQuestion - 1].correctAnswer;
  if (userAnswer === correctAnswer) {
    // jämföra frågans rätt svar med tryckt knapp
    // ge ett poäng!
    points++;
  } else {
    // ge minus
  }
  nextQuestion();
}

function nextQuestion() {
  if (currentQuestion >= questions.length) {
    // > =
    gameOver();
    return;
  }

  questionTextDiv.innerHTML = questions[currentQuestion].questionText;
  answer1Btn.innerHTML = questions[currentQuestion].answerOptions[0];
  answer2Btn.innerHTML = questions[currentQuestion].answerOptions[1];
  answer3Btn.innerHTML = questions[currentQuestion].answerOptions[2];

  currentQuestion++; // += 1, currentQuestion = currentQuestion + 1;
}

document.querySelector('#restartGameBtn').addEventListener('click', restartGame);

function restartGame() {
  document.querySelector('#gameOver').style.display = 'none';
  document.querySelector('#questionContainer').classList.remove('hidden');
  currentQuestion = 0;
  points = 0;
  nextQuestion();
}

function gameOver() {
  document.querySelector('#gameOver').style.display = 'block';
  document.querySelector('#questionContainer').classList.add('hidden');
  document.querySelector('#pointsContainer').innerHTML = `Du fick ${points} poäng!`;
  // document.querySelector('#gameOver').classList.toggle('hidden');
}
