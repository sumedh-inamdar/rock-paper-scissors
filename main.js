function computerPlay() {
    let play = ['Rock', 'Paper', 'Scissors'];
    let select = Math.floor(3*Math.random());
    return play[select];
}

function playRound(playerSelection, computerSelection) {
    /*
    1. Standardize playerSelection input (first letter capitalized, all remaining are lowercase)
    2. Check if player input is valid (Rock, Paper, Scissors). throw an error if not.
    3. Check user's input and return string based on computerSelection using switch statement
    */
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

function game() {
    let score = 0;
    let round = 1;
    let roundResult;
    
    while (round <= 5) {
        userInput = prompt('Type your pick below (Rock, Paper, or Scissors)');
        roundResult = playRound(userInput, computerPlay());
        if (roundResult.includes('invalid')) {
            console.log(roundResult);
            continue;
        }
        console.log(`Round ${round}: ${roundResult}`);
        score = roundResult.includes('Win') ? score + 1 : roundResult.includes('Lose') ? score - 1 : score;
        round = roundResult.includes('Tie') ? round : round + 1;
    }

    console.log(`and the winner is....${score > 0 ? 'You! Good job!' : 'the Computer :( next time!'}`);
}