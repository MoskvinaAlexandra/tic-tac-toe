const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let board = [];
let currentPlayer = CROSS;
let gameActive = true;

startGame();
addResetListener();

function startGame() {
    board = [
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY]
    ];
    currentPlayer = CROSS;
    gameActive = true;
    renderGrid(3);
}

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler(row, col) {
    if (!gameActive) return;
    if (board[row][col] !== EMPTY) return;
    
    board[row][col] = currentPlayer;
    renderSymbolInCell(currentPlayer, row, col);
    
    const winInfo = checkWin(currentPlayer);
    if (winInfo.isWin) {
        gameActive = false;
        highlightWinningCells(winInfo.cells);
        alert(`Победитель: ${currentPlayer}`);
        return;
    }
    
    if (isBoardFull()) {
        gameActive = false;
        alert('Победила дружба');
        return;
    }
    
    currentPlayer = currentPlayer === CROSS ? ZERO : CROSS;
    console.log('Теперь ходит:', currentPlayer);
}

function checkWin(player) {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
            return {
                isWin: true,
                cells: [[i, 0], [i, 1], [i, 2]]
            };
        }
        if (board[0][i] === player && board[1][i] === player && board[2][i] === player) {
            return {
                isWin: true,
                cells: [[0, i], [1, i], [2, i]]
            };
        }
    }
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
        return {
            isWin: true,
            cells: [[0, 0], [1, 1], [2, 2]]
        };
    }
    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
        return {
            isWin: true,
            cells: [[0, 2], [1, 1], [2, 0]]
        };
    }
    return { isWin: false };
}

function highlightWinningCells(cells) {
    cells.forEach(([row, col]) => {
        renderSymbolInCell(board[row][col], row, col, 'red');
    });
}

function isBoardFull() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === EMPTY) {
                return false;
            }
        }
    }
    return true;
}

function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);
    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell (row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler () {
    console.log('reset!');
    startGame();
}

function testWin () {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

function testDraw () {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell (row, col) {
    findCell(row, col).click();
}