/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
   // rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], 
    //diagonals
    [0, 4, 8],
    [2, 4, 6]
  ]
  

/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;
//will need to define these for my project
let squareIndex;

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.getElementById('message');
//i will need both of these cached element references for my own project
const boardContainer = document.querySelector('.board');
// console.log(squareEls)
const resetBtnEl = document.createElement('button')
resetBtnEl.id = 'reset';
resetBtnEl.textContent = 'Reset Game'
document.body.appendChild(resetBtnEl);
/*-------------------------------- Functions --------------------------------*/

function init() {
    board = Array(9).fill('');
    // board = ['X', 'O', ' ', 'X', 'O', ' ', 'X', 'O', 'X'];
    turn = 'X'; // current Player
    winner = false;
    tie = false;
    render()
}
// its a task to render Dom Elements and see the status of the game
function render() {
    updateBoard();
    updateMessage()
}

function updateBoard() {
    board.forEach((mark, index,) => {
        const square = squareEls[index];
        square.textContent = mark
    })
}

function updateMessage() {
    if (winner === true && tie === false) {
        messageEl.textContent = `${turn} Wins!`
    } else if (winner === false && tie === true) {
        messageEl.textContent = "it's a tie!"
    } else if (winner === false && tie === false) {
        messageEl.textContent = `Current turn: ${turn}`
    }
}

function handleClick(event) {
 squareIndex = parseInt(event.target.id)
// console.log(board[squareIndex])
 
if (board[squareIndex] || winner === true) return;

    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
 
}
init();
function placePiece(index) {
    board[index] = turn
    // console.log(board)

}

function checkForWinner() {
    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[b] ===board[c]) {
            winner = true;
            // console.log('Winner: ' + winner);
            return;
        }
    }
}

function checkForTie() {
    if (winner === true) return;
    tie = board.every(cell => cell !== "");
    // console.log(tie)
}

function switchPlayerTurn() {
    if(winner === true) return;
        //turnary operator
        turn = turn === 'X' ? 'O' : 'X'
        // variable =  if the condition is true ? pass this value : else this one
    // console.log('current turn: ' + turn);
}
/*----------------------------- Event Listeners -----------------------------*/

// boardContainer.addEventListener('click', handleClick)
squareEls.forEach(square => {
    square.addEventListener('click' , handleClick);
})

resetBtnEl.addEventListener('click' , init);

// init();

