//Declaramos el el form, el div donde iran los resultados, y la lista para almacenañ

const form = document.getElementById('form');
const resultsElem = document.querySelector('.finalMessage');
const hintsElem = document.querySelector('.hints');
const triesElem = document.querySelector('.tries');
const playAgain = document.querySelector('.playAgain');
const easyMode = document.querySelector('.easy');
const mediumMode = document.querySelector('.medium');
const hardMode = document.querySelector('.hard');
const tryButton =  document.querySelector('.try');
let triesLeft, mode;
let randomizedNumber;

easyMode.addEventListener('click', () => {
    mode = 50;
    triesLeft = 5;
    easyMode.classList.add('active');
    mediumMode.classList.add('hidden');
    hardMode.classList.add('hidden');
    actualTries();
    randomizedNumber = randomNumber(mode);
    easyMode.click() = '';
})
mediumMode.addEventListener('click', () => {
    mode = 150;
    triesLeft = 7;
    mediumMode.classList.add('active');
    easyMode.classList.add('hidden');
    hardMode.classList.add('hidden');
    actualTries();
    randomizedNumber = randomNumber(mode);
    mediumMode.click() = '';
})
hardMode.addEventListener('click', () => {
    mode = 550;
    triesLeft = 10;
    hardMode.classList.add('active');
    easyMode.classList.add('hidden');
    mediumMode.classList.add('hidden');
    actualTries();
    randomizedNumber = randomNumber(mode);
    hardMode.click() = '';
})


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const playerGuess = parseInt(e.target.guessInput.value);
    if (typeof playerGuess !== Number || playerGuess === undefined || playerGuess === NaN) errorText();
    else isRightNumber(playerGuess);
});

playAgain.addEventListener('click', () => window.location.reload());

const randomNumber = (mode) => randomized = Math.trunc(Math.random() * mode);

const errorText = ()=>{
    const message = document.querySelector('.finalText');
    hintsElem.classList.add('hidden');
    resultsElem.classList.remove('hidden');
    message.textContent = 'ERROR HAS INGRESADO UN NUMERO INVALIDO';
}

const finalText = (state) => {
    const message = document.querySelector('.finalText');
    hintsElem.classList.add('hidden');
    resultsElem.classList.remove('hidden');
    if (state) message.textContent = `Congratulations! The number was ${randomizedNumber}`;
    else if (state === 'error') message.textContent = 'ERROR HAS INGRESADO UN NUMERO INVALIDO';
    else message.textContent = `You lose, Try Again. The number was ${randomizedNumber}`;
}

const actualTries = () => triesElem.textContent = `Tries Remaining: ${triesLeft}`;

const addingHints = (state, number) => {
    const li = document.createElement('LI');
    li.classList.add('number');
    li.textContent = state === 'smaller' ? `Smaller than ${number}` : `Greater than ${number}`;
    hintsElem.append(li);
}

const greaterOrSmaller = (number) => {
    if (number > randomizedNumber) addingHints('smaller', number);
    else if (number < randomizedNumber) addingHints('greater', number);
}

const isRightNumber = (playerGuess) => {
    if (playerGuess === randomizedNumber && triesLeft !== 0) finalText(true);
    else if (playerGuess !== randomizedNumber && triesLeft !== 0) {
        greaterOrSmaller(playerGuess);
        triesLeft--;
        actualTries();
    }
    if (playerGuess !== randomizedNumber && triesLeft <= 0) finalText(false);
}