//selecting all the choices
const rock = document.querySelector("#rock"); 
const paper = document.querySelector("#paper");
const scissors = document.querySelector("#scissors");
const choices = document.querySelectorAll(".choice");

//selecting user score display and initializing score
const player1 = {
    score: 0,
    display: document.querySelector("#score-1")
};

//selecting computer score display and initializing score
const player2 = {
    score: 0,
    display: document.querySelector("#score-2")
};

const alertMessage = document.querySelector("#alert-msg"); //selecting display msg
const reset = document.querySelector("button#reset"); //selecting reset button
let winningScore = 3; //min winning score
let isGameOver = false; //to track when game is over

//updating the limit of score like best of 3
const playingLimit = document.querySelector("#limit");
playingLimit.addEventListener('change', () => {
    winningScore = parseInt(playingLimit.value);
    resetGame();
});

//generating computer choice using math.random to generate index of options
function getComputerChoice() {
    let compScore = Math.floor(Math.random()*3);
    const computerOptions = ['rock', 'paper', 'scissors']
    return computerOptions[compScore];
}

//storing user choice and starting game when user clicks a choice
for(let choice of choices){
    choice.addEventListener('click', () => {
        const getUserChoice = choice.getAttribute('id');
        playGame(getUserChoice);
    })
}

//game logic
function playGame(getUserChoice) {
    let compChoice = getComputerChoice();
    let userChoice = getUserChoice;

    if (userChoice === compChoice){
        alertMessage.textContent = "ITS A DRAW!";
    } else {
        let userWin = true;
        if (userChoice === "rock"){
            //paper, scissors
           userWin = compChoice === "paper" ? false : true;
        } else if (userChoice === "paper"){
            //rock, scissors
            userWin = compChoice === "rock" ? true : false;
        } else {
            //rock, paper
            userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);//to update game and display when its not a draw
    }
}

//to track who wins and updating msg and score
const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin){
        alertMessage.textContent = `You Won! Your ${userChoice} beat ${compChoice}!`;
        updateScore(player1, player2);
    } else {
        alertMessage.textContent = `Computer Won! It's ${compChoice} beat your ${userChoice}!`;
        updateScore(player2, player1);
    }
};

reset.addEventListener('click', resetGame);

//to disable choices 
function disabledChoices() {
    for (let choice of choices){
        choice.style.pointerEvents = 'none';
    }
}

//to update score when somoeone wins 
function updateScore(player, opponent){
    if (!isGameOver){
        player.score += 1; //updating score when player wins 
        if (player.score === winningScore) {
            isGameOver = true;
            player.display.classList.add('winner'); //updating color for winner score
            opponent.display.classList.add('loser'); //updating color for loser score
            disabledChoices(); //disabling choices when game is over
            winnerMsg(player);
        }
    }
    player.display.textContent = player.score; //changing score display to show that player won
}

function winnerMsg(winner){
    if(winner === player1){
        alertMessage.textContent = "Congratulations! You Won!";
    } else {
        alertMessage.textContent = "You Lost! Better Luck Next Time";
    }
}

function resetGame(){
    isGameOver = false;
    for (let p of [player1, player2]){
        p.score = 0;
        p.display.textContent = p.score;
        p.display.classList.remove('winner', 'loser');
    }
    alertMessage.textContent = "Choose Your Weapon!";
    choices.forEach(choice => {
        choice.style.pointerEvents = "auto";
    });
}

