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

function movesRemaining(board) {
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
        return score; // x wins
    }

    if (score == -1) {
        return score; // o wins
    }

    if (movesRemaining(board) == false) {
        return 0; // draw
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

const OptimalMove = (best, player, isMax) => { //best: 10000 (min) or -10000 (max); player (max) or opponent (min); isMax == false for max and isMax == true for min
    const bestMove = (() => {
        let row = 0;
        let col = 0;

        return { row, col };
    })();

    const findNextMove = (board) => {
        let bestVal = best;

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (board[row][col] == "_") {
                    board[row][col] = player;
                    
                    let moveVal = minimax(board, isMax);
    
                    board[row][col] = "_";
    
                    if (isMax) {
                        if (moveVal < bestVal) {
                            bestVal = moveVal;
                            bestMove.row = row;
                            bestMove.col = col;
                        }
                    } else {
                        if (moveVal > bestVal) {
                            bestVal = moveVal;
                            bestMove.row = row;
                            bestMove.col = col;
                        }
                    }
                }
            }
        }
    
        return bestMove;
    }

    return { findNextMove };
};

function updateBoard(board, nextBestMove, isPlayerTurn) {
    if (isPlayerTurn) {
        board[nextBestMove.row][nextBestMove.col] = player;
    } else {
        board[nextBestMove.row][nextBestMove.col] = opponent;
    }

    return board;
}

function runGame() { // Computer vs. computer
    let gameBoard = [
        ["o", "x", "_"],
        ["_", "_", "_"],
        ["x", "_", "o"],
    ];

    while (evaluateBoard(gameBoard) == 0 && movesRemaining(gameBoard)) {
        let bestMove = optimalMaxMove.findNextMove(gameBoard);

        gameBoard = updateBoard(gameBoard, bestMove, true);
        console.log(gameBoard);
        // Check if the game has ended before making the opponent's move
        if (evaluateBoard(gameBoard) != 0 || !movesRemaining(gameBoard)) {
            break;
        }

        bestMove = optimalMinMove.findNextMove(gameBoard);

        gameBoard = updateBoard(gameBoard, bestMove, false);
        console.log(gameBoard);
    }

    return gameBoard;
}

const optimalMaxMove = OptimalMove(-10000, player, false);
const optimalMinMove = OptimalMove(10000, opponent, true);

console.log(runGame());