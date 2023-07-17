let round = 1;
let score = [0, 0];

const userScore = document.querySelector('.user-box .score');
const computerScore = document.querySelector('.computer-box .score');

const buttons = document.querySelectorAll('.btn-user');

const messageTitle = document.querySelector('.mTitle');
const messageDetailTitle = document.querySelector('.mDetail-title');
const messageDetailDescription = document.querySelector('.mDetail-description');

const userEmoji = document.querySelector('.user-emoji');
const computerEmoji = document.querySelector('.computer-emoji');
const emoji = {
  rock: '✊',
  paper: '✋',
  scissors: '🖖',
};

function getComputerChoice() {
  // 1. initialize a list of pre-defined values
  const LIST = ['rock', 'paper', 'scissors'];

  // 2. randomly select a value from the list
  const randomNumber = Math.floor(Math.random() * LIST.length);

  // 3. return what was selected in (2)
  return LIST[randomNumber];
}

function checkWinner(e) {
  const playerSelection = e.target.dataset.opt;
  const computerSelection = getComputerChoice();

  const _log = playRound(playerSelection, computerSelection).split('!');

  if (score[0] === 5 || score[1] === 5) {
    buttons.forEach((btn) => (btn.disabled = true));

    messageDetailTitle.textContent = `${_log[0]}!`;
    messageDetailDescription.innerHTML =
      '<button class="btn-def">play again</button>';
    userScore.textContent = score[0];
    computerScore.textContent = score[1];
    userEmoji.textContent = emoji[playerSelection];
    computerEmoji.textContent = emoji[computerSelection];
  }

  const restart = document.querySelector('.btn-def');

  console.log(restart);
  if (restart) {
    restart.addEventListener('click', function (e) {
      init();
      buttons.forEach((btn) => (btn.disabled = false));
    });
    return;
  }

  messageDetailTitle.textContent = `${_log[0]}!`;
  messageDetailDescription.textContent = _log[1];
  userScore.textContent = score[0];
  computerScore.textContent = score[1];
  userEmoji.textContent = emoji[playerSelection];
  computerEmoji.textContent = emoji[computerSelection];

  round++;
  messageTitle.textContent = `Round ${round}`;
}

function playRound(playerSelection, computerSelection) {
  /*  --- RULES ---
        :: Rock wins against scissors.
        :: Scissors win against paper.
        :: Paper wins against rock.
    */

  // 1. check for a WIN
  if (
    (playerSelection === 'rock' && computerSelection === 'scissors') ||
    (playerSelection === 'paper' && computerSelection === 'rock') ||
    (playerSelection === 'scissors' && computerSelection === 'paper')
  ) {
    score[0]++;
    return `You Win! ${playerSelection} beats ${computerSelection}`;
  }

  // 2. check for a tie
  if (playerSelection === computerSelection) {
    return `Draw! There is a TIE`;
  }

  // 3. return a lose
  score[1]++;
  return `You Lose! ${computerSelection} beats ${playerSelection}`;
}

function init() {
  messageTitle.textContent = `Round 1`;
  messageDetailTitle.textContent = 'Take a pick';
  messageDetailDescription.textContent =
    'First to score 5 points wins the game';

  userScore.textContent = '0';
  computerScore.textContent = '0';

  userEmoji.textContent = '❓';
  computerEmoji.textContent = '❓';

  round = 1;
  score = [0, 0];
}

function game() {
  init();
  buttons.forEach((btn) => btn.addEventListener('click', checkWinner));
}

game();
