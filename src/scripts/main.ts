import { wordList } from "../utils/database";

let chosenWord: string = "";
let display: string[] = [];
let guessedLetters: Set<string>;
let lives: number;
const maxLives = 7;

const wordDisplay = document.querySelector(".word-display") as HTMLDivElement;
const messageDisplay = document.querySelector("#message") as HTMLDivElement;
const livesDisplay = document.querySelector("#lives-count") as HTMLSpanElement;
const alphabetSection = document.querySelector(
  ".alphabet-grid",
) as HTMLDivElement;
const hangmanContainer = document.querySelector(
  ".hangman-container",
) as HTMLDivElement;
const resetButton = document.querySelector(".reset-btn") as HTMLButtonElement;

const updateDisplay = (letter: string): void => {
  chosenWord.split('').forEach((char, i) => {
    if (char === letter) {
      display[i] = letter;
    }
  })
}

const updateDisplayWithMap = (letter: string): void => {
  display = chosenWord.split('').map((char, i) => (char === letter ? letter : display[i]))
}

const updateHangmanGraphic = ():void => {
  const stages = ['gallows', 'head', 'body', 'left-arm', 'right-arm', 'left-leg', 'right-leg'];
  if (lives < maxLives) {
    const part = hangmanContainer.querySelector(`.${stages[maxLives - lives - 1]}`) as HTMLDivElement
    if (part) {
      part.style.display = 'block';
    }
  }
}

const checkGameStatus = (): void => {
  if (lives === 0) {
    messageDisplay.textContent = `You lose. The word was : ${chosenWord}`
  } else if (!display.includes('_')) {
    messageDisplay.textContent = 'Congratulations! You win!'
  }
}

const updateUI = (): void => {
  wordDisplay.textContent = display.join(" ");
  livesDisplay.textContent = lives.toString();
};

const handleGuess = (letter: string): void => {
  if (guessedLetters.has(letter) || lives === 0) {
    if (guessedLetters.has(letter)) {
      messageDisplay.textContent = `You already guessed ${letter}. Please try again!`
    }
    return;
  }
  guessedLetters.add(letter);
  messageDisplay.textContent = '';

  if (chosenWord.includes(letter)) {
    updateDisplay(letter)
  } else {
    lives--;
    updateHangmanGraphic();
  }

  checkGameStatus();
  updateUI();
}

const createAlphabetGrid = (): void => {
  alphabetSection.innerHTML = "";
  const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
  alphabet.forEach(letter => {
    const button = document.createElement("button");
    button.textContent = letter;
    button.classList.add('alphabet-btn');
    button.addEventListener('click', () => handleGuess(letter));
    alphabetSection.appendChild(button)
  });
};

const startGame = (): void => {
  chosenWord = wordList[Math.floor(Math.random() * wordList.length)];
  display = new Array<string>(chosenWord.length).fill("_");
  guessedLetters = new Set();
  lives = maxLives;
  updateUI();
  createAlphabetGrid();
};

const resetGame = (): void => {
  const bodyParts = hangmanContainer.querySelectorAll('div');
  bodyParts.forEach(part => part.style.display = 'none');
  messageDisplay.textContent = '';
  startGame();
}

resetButton.addEventListener('click', resetGame);

startGame();
