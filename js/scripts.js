"use strict";

const launchGame = (function () {
    let timerID;
    let counter = 3;
    let playerSelection;
    let computerSelection;
    const scores = [0,0];
    const CHOICES = ['rock', 'paper', 'scissors'];
    
    let btn;
    let score;
    let markup;
    let messageBox;
    let computerBox;
    let iconsNodeList;
    const gameNode = document.querySelector('.game-box');

    function renderDefaultHTML () {
        markup = generateDefaultHTML();

        clearNode(gameNode);
        gameNode.insertAdjacentHTML('beforeend', markup);
    }

    function renderPlayGround(node) {
        markup = generatePlayGroundHTML(node);

        clearNode(gameNode);
        gameNode.insertAdjacentHTML('beforeend', markup);
    }

    function clearNode (node) {
        node.textContent = '';
    }

    function playRound (player) {
        computerBox = document.querySelector('.comp');

        timerID = setInterval(function() {
            computerBox.textContent = counter;

            if(counter === 0) {
                playerSelection = player.classList[1];
                computerSelection = getComputerChoice();

                computerBox.classList.add(`${computerSelection}`);
                markup = `
                    <img src="./img/icon-${computerSelection}.svg" alt="${computerSelection} icon">
                `;
                
                clearNode(computerBox);
                computerBox.insertAdjacentHTML('beforeend', markup);

                markup = `
                    <p class="main-text">${checkWinner(playerSelection, computerSelection)}</p>
                    <button class="btn main-text" type="button">Play Again!</button>
                `;
                messageBox = document.querySelector('.msg');
                messageBox.insertAdjacentHTML('beforeend', markup);

                player.insertAdjacentHTML('beforeend', markup);
                handleButtonClick();

                clearInterval(timerID);
            }

            counter--;
        }, 500);
    }

    function handleNodeClicks () {
        iconsNodeList = document.querySelectorAll('.icon-box');
        
        iconsNodeList.forEach(node => node.addEventListener('click', function() {
            gameNode.style.backgroundImage = "none";
            renderPlayGround(this);
            playRound(this);
        }))
    }

    function handleButtonClick () {
        btn = document.querySelector('.btn');

        btn.addEventListener('click', function() {
            renderDefaultHTML();
            gameNode.style.backgroundImage = "url('./img/triangle.svg')";
            handleNodeClicks();
            counter = 3;
        })
    }

    function getComputerChoice() {
        return CHOICES[Math.floor(Math.random() * 3)];
    }

    function generateDefaultHTML () {
        return `
            <div class="top-box">
                <div class="icon-box paper"><img src="./img/icon-paper.svg" alt="paper icon"></div>
                <div class="icon-box scissors"><img src="./img/icon-scissors.svg" alt="scissors icon"></div>
            </div>
            <div class="icon-box rock"><img src="./img/icon-rock.svg" alt="rock icon"></div>
            
        `;
    }

    function generatePlayGroundHTML (node) {
        node.classList.add('icon-box-bigger');
        const stringifiedNode = node.outerHTML;
        return `
            <div class="top-title">
                <p class="main-text">Player</p>
                <p class="main-text">Computer</p>
            </div>
            <div class="top-box">
                ${stringifiedNode}
                <div class="msg">
                </div>
                <div class="icon-box main-text icon-box-bigger  comp"></div>
            </div>
        `;
    }

    function checkWinner(playerSelection, computerSelection) {
        if(playerSelection === computerSelection) {
            return 'Tie';
        } else if(computerSelection === 'rock' && playerSelection === 'scissors') {
            scores[0]++;
            return 'You Lose!';
        } else if(computerSelection === 'paper' && playerSelection === 'rock') {
            scores[0]++;
            return 'You Lose!';
        } else if(computerSelection === 'scissors' && playerSelection === 'paper') {
            scores[0]++;
            return 'You Lose!';
        } else {
            scores[1]++;
            score = document.querySelector('.score');
            score.textContent = `${scores[1]}`;
            return `You Win!`;
        }
    }
    
    function init () {
        renderDefaultHTML();
        handleNodeClicks();
    }

    return init;
})();

launchGame();