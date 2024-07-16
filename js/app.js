// Constants
const winningCombos = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [2, 4, 6]  // Diagonal from top-right to bottom-left
];

// Variables 
let board;
let turn;
let winner;
let tie;

// Cached Element References
const squareEls = document.querySelectorAll('.sqr');
const resetBtnEl = document.getElementById('reset');

// Functions
function init() {
    board = ['', '', '', '', '', '', '', '', ''];
    turn = 'X';
    winner = false;
    tie = false;
    render();
}

function render() {
    updateBoard();
    updateMessage();
}

function updateBoard() {
    board.forEach((mark, index) => {
        squareEls[index].textContent = mark;
    });
}

function updateMessage() {
    let message = '';
    if (winner) {
        message = `Player ${turn} wins!`;
    } else if (tie) {
        message = 'It\'s a tie!';
    } else {
        message = `Player ${turn}'s turn`;
    }
    document.getElementById('game-title').textContent = message;
}

function handleClick(event) {
    const index = Number(event.target.id);

    if (board[index] !== '' || winner) return;

    placePiece(index);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
}

function placePiece(index) {
    board[index] = turn;
}

function checkForWinner() {
    winningCombos.forEach(combo => {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winner = true;
            return;
        }
    });
}

function checkForTie() {
    if (winner) return;
    tie = !board.includes('');
}

function switchPlayerTurn() {
    if (winner) return;
    turn = turn === 'X' ? 'O' : 'X';
}

// Event Listeners
squareEls.forEach(square => {
    square.addEventListener('click', handleClick);
});

resetBtnEl.addEventListener('click', init);

// Initialize the game
init();

