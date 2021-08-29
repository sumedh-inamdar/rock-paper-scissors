let userScore = 0;
let compScore = 0;
const validInputs = ['Rock', 'Paper', 'Scissors'];

//target nodes
const RPSbuttons = document.querySelectorAll('.buttonContainer .RPSbutton');
const resultContainer =  document.querySelector('.playResultContainer');
const userScoreNode = document.querySelector('#userScore');
const compScoreNode = document.querySelector('#compScore');
const modal = document.querySelector('.endGameModal');
const result = document.querySelector('#endGameResult');
const resetNode = document.querySelector('#reset');
const year = document.querySelector('#year');

function computerPlay() {
    let select = Math.floor(3*Math.random());
    return validInputs[select];
}

function playRound(playerSelection, computerSelection) {
   lookUpTable = [[0, -1, 1], [1, 0, -1], [-1, 1, 0]]; // 0 = tie; 1 = win; 2 = lose. [[Rock user input] [Paper user input] [Scissors user input]]

   let userInputIndex = validInputs.indexOf(playerSelection, 0);
   let compInputIndex = validInputs.indexOf(computerSelection, 0);
   let playResult = lookUpTable[userInputIndex][compInputIndex];

   switch (playResult) {
        case 0:
            return `Tie round! ${playerSelection} was played on both sides. Let's try again`;
        case 1:
            userScore++;
            return `Round Won! ${playerSelection} beats ${computerSelection}.`;
        case -1:
            compScore++;
            return `Round Lost! ${computerSelection} beats ${playerSelection}.`;
   }
}

function updateScore() {
    userScoreNode.textContent = `Your score: ${userScore}`;
    compScoreNode.textContent = `Computer score: ${compScore}`;
}

function isGameOver() {
    if (userScore >=5 || compScore >= 5) {
        displayEndGame();
        return true;
    }
}
function displayEndGame() {
    result.textContent = userScore >= 5 ? `Congrats on beating the computer! Here's your one of a kind RPS trophy 🏆!` : `You've been defeated by the computer 😿 . Next time!`;
    modal.style.display = 'block';
}

function resetGame() {
    userScore = 0;
    compScore = 0;
    updateScore();
    resultContainer.textContent = '';
    result.textContent = '';
    modal.style.display = 'none';
}

RPSbuttons.forEach( button => {
    button.addEventListener('click', e => {
        if (isGameOver()) {
            return;
        }
        console.log(e.target);
        resultContainer.textContent = playRound(e.target.dataset.type, computerPlay());
        updateScore();
        isGameOver();
    });
});

resetNode.addEventListener('click', resetGame);

year.textContent = new Date().getFullYear();

// Close modal when user clicks outside
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}



