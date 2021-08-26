let userScore = 0;
let compScore = 0;
const validInputs = ['Rock', 'Paper', 'Scissors'];

//target nodes
const RPSbuttons = document.querySelectorAll('.buttonContainer button');
const resultContainer =  document.querySelector('.playResultContainer');
const userScoreNode = document.querySelector('#userScore');
const compScoreNode = document.querySelector('#compScore');
const endGameContainerNode = document.querySelector('.endGameContainer');
const endGameResultNode = document.querySelector('#endGameResult');
const resetNode = document.querySelector('#reset');

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
    endGameResultNode.textContent = userScore >= 5 ? `Congrats on beating the computer! Here's your one of a kind RPS trophy 🏆!` : `You've been defeated by the computer 😿 . Next time!`;
    endGameContainerNode.classList.add('active');
}

function resetGame() {
    userScore = 0;
    compScore = 0;
    updateScore();
    resultContainer.textContent = '';
    endGameResultNode.textContent = '';
    endGameContainerNode.classList.remove('active');
}

RPSbuttons.forEach( button => {
    button.addEventListener('click', e => {
        if (isGameOver()) {
            return;
        }
        resultContainer.textContent = playRound(e.target.id, computerPlay());
        updateScore();
        isGameOver();
    });
});

resetNode.addEventListener('click', resetGame);




