let userScore = 0;
let compScore = 0;
let round = 0;

function computerPlay() {
    let play = ['Rock', 'Paper', 'Scissors'];
    let select = Math.floor(3*Math.random());
    return play[select];
}

function playRound(playerSelection, computerSelection) {
   playerSelection = playerSelection[0].toUpperCase() + playerSelection.slice(1).toLowerCase();
   validInputs = ['Rock', 'Paper', 'Scissors'];
   lookUpTable = [[0, -1, 1], [1, 0, -1], [-1, 1, 0]]; // 0 = tie; 1 = win; 2 = lose. [[Rock user input] [Paper user input] [Scissors user input]]

   let userInputIndex = validInputs.indexOf(playerSelection, 0);
   if (userInputIndex === -1) {
       return "That was an invalid input. Try again.";
   }
   let playResult = lookUpTable[userInputIndex][validInputs.indexOf(computerSelection, 0)]; //Assume computer input is valid

   switch (playResult) {
        case 0:
            return `Tie game! ${playerSelection} was played on both sides. Let's try again`;
            break;
        case 1:
            return `You Win! ${playerSelection} beats ${computerSelection}.`;
            break;
        case -1:
            return `You Lose! ${computerSelection} beats ${playerSelection}.`;
            break;
   }
}

function updateScore(playResult) {
    if (playResult.includes('Win')) {
        userScore++;
    } else if (playResult.includes('Lose')) {
        compScore++;
    }

    

}

const buttons = document.querySelectorAll('button');

buttons.forEach( button => {
    button.addEventListener('click', e => {
        const playResult = playRound(e.id, computerPlay());
        document.querySelector('.playResultContainer').textContent = playResult;
        updateScore(playResult);
    });
});




