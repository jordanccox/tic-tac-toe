const player = "x"; //maximizer; return 1 if player wins
const opponent = "o"; // minimizer; return -1 if opponent wins

function evaluateBoard(b) {
    // Check for win conditions

    // Check rows
    for (let row = 0; row < 3; row++) {
        if (b[row][0] == b[row][1] && b[row][1] == b[row][2]) {
            if (b[row][0] == player) {
                return 1;
            } else if (b[row][0] == opponent) {
                return -1;
            }
        }
    }

    // Check cols
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (b[0][col] == b[1][col] && b[1][col] == b[2][col]) {
                if (b[0][col] == player) {
                    return 1;
                } else if (b[0][col] == opponent) {
                    return -1;
                }
            }
        }
    }

    // Check diagonals
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (b[0][0] == b[1][1] && b[1][1] == b[2][2]) {
                if (b[0][0] == player) {
                    return 1;
                } else if (b[0][0] == opponent) {
                    return -1;
                }
            }

            if (b[0][2] == b[1][1] && b[1][1] == b[2][0]) {
                if (b[0][2] == player) {
                    return 1;
                } else if (b[0][2] == opponent) {
                    return -1;
                }
            }
        }
    }

    // No winner yet
    return 0;
}

let board = [
    ["_", "x", "o"],
    ["o", "x", "x"],
    ["o", "_", "o"],
];
let board2 = [
    ["_", "_", "_"],
    ["_", "_", "_"],
    ["_", "_", "_"],
];
let board3 = [
    ["o", "_", "x"],
    ["_", "_", "_"],
    ["_", "_", "_"],
];
// console.log(minimax(board3, true));
// console.log(evaluateBoard(board3));

// ['_', 'x', 'o'], ['o', 'x', 'x'], ['o', '_', 'o']
// ['_','_','_'], ['_','_','_'], ['_','_','_']

function movesLeft(board) {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] == "_") {
                return true;
            }
        }
    }
    return false;
}

function minimax(board, isMax) {
    let score = evaluateBoard(board);

    if (score == 1) {
        return score;
    }

    if (score == -1) {
        return score;
    }

    if (movesLeft(board) == false) {
        return 0; //draw
    }

    if (isMax) {
        let best = -10000;

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (board[row][col] == "_") {
                    board[row][col] = player; 

                    best = Math.max(best, minimax(board, !isMax));

                    board[row][col] = "_";
                }
            }
        }

        return best;
    } else {
        let best = 10000;

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (board[row][col] == "_") {
                    board[row][col] = opponent;

                    best = Math.min(best, minimax(board, !isMax));

                    board[row][col] = "_";
                }
            }
        }

        return best;
    }
}

function optimalMaxMove(board) {
    let maxVal = -10000;

    const bestMove = (() => {
        let row = 0;
        let col = 0;

        return { row, col };
    })();

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] == "_") {
                board[row][col] = player;

                let moveVal = minimax(board, false);

                board[row][col] = "_";

                if (moveVal > maxVal) {
                    maxVal = moveVal;
                    bestMove.row = row;
                    bestMove.col = col;
                }
            }
        }
    }

    return bestMove;
}

function optimalMinMove(board) {
    let minVal = 10000;

    const bestMove = (() => {
        let row = 0;
        let col = 0;

        return { row, col };
    })();

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] == "_") {
                board[row][col] = opponent;

                let moveVal = minimax(board, true);

                board[row][col] = "_";

                if (moveVal < minVal) {
                    minVal = moveVal;
                    bestMove.row = row;
                    bestMove.col = col;
                }
            }
        }
    }

    return bestMove;
}

function updateBoard(board, nextBestMove, isPlayerTurn) {
    // if (evaluateBoard(board) != 0 || !movesLeft(board)) {
    //     endGame(board);
    //     return;
    // }

    if (isPlayerTurn) {
        board[nextBestMove.row][nextBestMove.col] = player;
    } else {
        board[nextBestMove.row][nextBestMove.col] = opponent;
    }

    return board;
}

function runGame() {
    let gameBoard = [
        ["_", "_", "_"],
        ["_", "_", "_"],
        ["_", "_", "_"],
    ];

    while (evaluateBoard(gameBoard) == 0 && movesLeft(gameBoard)) {
        let bestMove = optimalMaxMove(gameBoard);

        gameBoard = updateBoard(gameBoard, bestMove, true);

        // Check if the game has ended before making the opponent's move
        if (evaluateBoard(gameBoard) != 0 || !movesLeft(gameBoard)) {
            break;
        }

        bestMove = optimalMinMove(gameBoard);

        gameBoard = updateBoard(gameBoard, bestMove, false);
    }

    return gameBoard;
}

// function endGame(board) {
//     console.log(board);
// }

// let nextBestMove = optimalMinMove(board3);

// console.log(nextBestMove.row + " " + nextBestMove.col);

console.log(runGame());
