"use strict";

const scores = [0,0];
const CHOICES = ['rock', 'paper', 'scissors'];


function getComputerChoice() {
    return CHOICES[Math.floor(Math.random() * 3)];
}

function getPlayerChoice() {
    const message = `Choose between the following i.e 1, 2, or 3.
    1.Rock
    2.Paper
    3.Scissors
    `;

    const userInput = parseInt(prompt(message));

    if(isNaN(userInput))
        return "Try to enter a real number.";

    if(![1,2,3].includes(userInput))
        return "Try to respect the ranges. 1,2,3";
    
    return CHOICES[userInput-1];
}

function playRound(playerSelection, computerSelection) {
    // check player input
    if(!CHOICES.includes(playerSelection)) 
        return playerSelection;

    // rules...
    if(playerSelection === computerSelection) {
        return 'There is a tie';
    } else if(computerSelection === 'rock' && playerSelection === 'scissors') {
        scores[0]++;
        return 'You Lose! rock beats scissors';
    } else if(computerSelection === 'paper' && playerSelection === 'rock') {
        scores[0]++;
        return 'You Lose! paper beats rock';
    } else if(computerSelection === 'scissors' && playerSelection === 'paper') {
        scores[0]++;
        return 'You Lose! scissors beats paper';
    } else {
        scores[1]++;
        return `You Win! ${playerSelection} beats ${computerSelection}`;
    }
}

function checkWinner(computerScore, playerScore) {
    console.log(computerScore, playerScore);

    if(computerScore === playerScore) {
        return 'NO WINNER!!!';
    } else if(computerScore > playerScore) {
        return 'COMPUTER WINS!!!';
    } else if(computerScore < playerScore) {
        return 'PLAYER WINS!!!';
    }
}

function game() {
    for (let i = 0; i < 5; i++) {
        console.log(playRound(getPlayerChoice(), getComputerChoice()));    
    }
    console.log(checkWinner(scores[0], scores[1]));
}

game();