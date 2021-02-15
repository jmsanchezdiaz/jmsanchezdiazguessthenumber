//Declaramos el el form, el div donde iran los resultados, y la lista para almacenañ

const form = document.getElementById('form');
const resultsElem = document.querySelector('.finalMessage');
const hintsElemSmaller = document.querySelector('.hintsSmaller');
const hintsElemGreater = document.querySelector('.hintsGreater');
const triesElem = document.querySelector('.tries');
const playAgain = document.querySelector('.playAgain');

let triesLeft = 5;
let greater = [],
    smaller = [];


    
const randomNumber = (mode) => randomized = Math.trunc(Math.random() * mode);
const randomizedNumber = randomNumber(100);

console.log(randomizedNumber);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const playerGuess = parseInt(e.target.guessInput.value);
    isRightNumber(playerGuess);
});

playAgain.addEventListener('click',()=> window.location.reload());

const finalText = (state) => {
    const message = document.querySelector('.finalText');
    hintsElemGreater.classList.add('hidden');
    hintsElemSmaller.classList.add('hidden');
    resultsElem.classList.remove('hidden');
    if (state) message.textContent = `Congratulations! The number was ${randomizedNumber}`;
    else message.textContent = `You lose, Try Again. The number was ${randomizedNumber}`;
}

const actualTries = ()=> triesElem.textContent = `Tries Remaining: ${triesLeft}`;

actualTries();

const addingHints = (state, number) => {
        const li = document.createElement('LI');
        li.classList.add('number');
        li.textContent = number;
        if (state === 'smaller') hintsElemSmaller.append(li);
        else if (state === 'greater')hintsElemGreater.append(li);
}


const greaterOrSmaller = (number) => {
    if (number > randomizedNumber) {
        addingHints('smaller',number)
    } else if (number < randomizedNumber){
        addingHints('greater',number)
    }
}

const isRightNumber = (playerGuess) => {
    if (playerGuess === randomizedNumber && triesLeft !== 0) finalText(true);
    else if (playerGuess !== randomizedNumber && triesLeft !== 0) {
        greaterOrSmaller(playerGuess);
        triesLeft--;
        actualTries();
    }
    if (playerGuess !== randomizedNumber && triesLeft <= 0 ) finalText(false);
}