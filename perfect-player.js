// const player = "x"; //maximizer; return 1 if player wins
// const opponent = "o"; // minimizer; return -1 if opponent wins

function evaluateBoard(b) {
    // Check for win conditions

    // Check rows
    for (let row = 0; row < 3; row++) {
        if (b[row][0] == b[row][1] && b[row][1] == b[row][2]) {
            if (b[row][0] == "x") {
                return 1;
            } else if (b[row][0] == "o") {
                return -1;
            }
        }
    }

    // Check cols
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (b[0][col] == b[1][col] && b[1][col] == b[2][col]) {
                if (b[0][col] == "x") {
                    return 1;
                } else if (b[0][col] == "o") {
                    return -1;
                }
            }
        }
    }

    // Check diagonals
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (b[0][0] == b[1][1] && b[1][1] == b[2][2]) {
                if (b[0][0] == "x") {
                    return 1;
                } else if (b[0][0] == "o") {
                    return -1;
                }
            }

            if (b[0][2] == b[1][1] && b[1][1] == b[2][0]) {
                if (b[0][2] == "x") {
                    return 1;
                } else if (b[0][2] == "o") {
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
                    board[row][col] = "x";

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
                    board[row][col] = "o";

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
                    board[row][col] = player.token;

                    let moveVal = minimax(board, isMax);

                    board[row][col] = "_";

                    if (isMax) {
                        if (moveVal < bestVal) { // <
                            bestVal = moveVal;
                            bestMove.row = row;
                            bestMove.col = col;
                        }
                    } else {
                        if (moveVal > bestVal) { // >
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
        board[nextBestMove.row][nextBestMove.col] = "x";
    } else {
        board[nextBestMove.row][nextBestMove.col] = "o";
    }

    return board;
}

// function runGame() { // Computer vs. computer -- you can ignore this

//     let gameBoard = [
//         ["_", "_", "_"],
//         ["_", "_", "_"],
//         ["_", "_", "_"],
//     ];

//     while (evaluateBoard(gameBoard) == 0 && movesRemaining(gameBoard)) {
//         let bestMove = optimalMaxMove.findNextMove(gameBoard);

//         gameBoard = updateBoard(gameBoard, bestMove, true);

//         // Check if the game has ended before making the opponent's move
//         if (evaluateBoard(gameBoard) != 0 || !movesRemaining(gameBoard)) {
//             break;
//         }

//         bestMove = optimalMinMove.findNextMove(gameBoard);

//         gameBoard = updateBoard(gameBoard, bestMove, false);
//     }

//     return gameBoard;
// }


// const optimalMaxMove = OptimalMove(-10000, player, false);
// const optimalMinMove = OptimalMove(10000, opponent, true);

// console.log(runGame());

// Human vs. Computer Mode

const Player = (playerName, symbol) => {
    let name = playerName;
    let token = symbol;
    let isTurn = false;

    return { name, token, isTurn };
};

const Gameplay = (() => {
    const player = Player("Human", "x"); // Human / maximizer
    const opponent = Player("Computer", "o"); // Computer / minimizer
    const optimalMinMove = OptimalMove(10000, opponent, true);

    const initializeGame = () => {
        let gameBoard = [
            ["_", "_", "_"],
            ["_", "_", "_"],
            ["_", "_", "_"],
        ];

        player.isTurn = true;
        opponent.isTurn = false;

        attachClickHandlers(player, opponent, gameBoard);
    };

    const attachClickHandlers = (player, opponent, gameBoard) => {
        const squares = document.querySelectorAll(".square");

        for (let i = 0; i < squares.length; i++) {
            squares[i].addEventListener("click", () => {
                let row = squares[i].getAttribute("row");
                let col = squares[i].getAttribute("col");
                handlePlayerMove(player, opponent, gameBoard, row, col);
            });
        }
    };

    const handlePlayerMove = (player, opponent, gameBoard, row, col) => {
        if (!movesRemaining(gameBoard)) {
            // draw procedures
        }

        if (player.isTurn && gameBoard[row][col] == "_") {
    
            // Update gameBoard and UI
            gameBoard[row][col] = player.token;
            updateUI(player.token, row, col);

            // End player's turn and check if they won
            player.isTurn = false;
            if (evaluateBoard(gameBoard) != 0) {
                return;
            }
            // Switch to computer's turn
            opponent.isTurn = true;
            handleComputerMove(gameBoard, player, opponent);
        }
    };

    const handleComputerMove = (gameBoard, player, opponent) => { //Spmething is broken...
        if (!movesRemaining(gameBoard)) {
            // draw procedures
        }
        
        let bestMove = optimalMinMove.findNextMove(gameBoard);
        gameBoard = updateBoard(gameBoard, bestMove, false);
        updateUI(opponent.token, bestMove.row, bestMove.col);

        // Check if the game has ended before making the opponent's move
        if (evaluateBoard(gameBoard) != 0 || !movesRemaining(gameBoard)) {
            return;
        }
        // End Computer's turn
        opponent.isTurn = false;
        console.log(gameBoard);

        // Switch back to human's turn
        player.isTurn = true;
        attachClickHandlers(player, opponent, gameBoard);
    };

    const updateUI = (token, row, col) => {
        const square = document.querySelector(`div[row='${row}'][col='${col}']`);

        square.innerHTML = token;
    };

    initializeGame();
})();

