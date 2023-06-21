const Player = (playerName, symbol) => {
    // prompt function to enter name
    let name = playerName;
    let token = symbol;
    let isTurn = false;

    return { name, token, isTurn };

};

const Gameboard = (() => {

    const board = [];

    const WIN_CONDITIONS = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [6, 4, 2], [0, 4, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8]];

    const checkWinConditions = (player) => {
        let matchedIndices = [];
        let copyOfBoard = [...Gameboard.board];
        let count = 0;

        copyOfBoard.forEach(element => {
            if (element == player.token) {
                matchedIndices.push(copyOfBoard.indexOf(element));
                copyOfBoard[copyOfBoard.indexOf(element)] = "";
            }
        });

        for (let i = 0; i < WIN_CONDITIONS.length; i++) {
            for (let j = 0; j < WIN_CONDITIONS[i].length; j++) {
                if (matchedIndices.includes(WIN_CONDITIONS[i][j])) {
                    count++;
                }
                if (count == 3) {
                    console.log(`${player.name} wins!`); // Print to UI
                    // call endGame() function that disables the board. If user wants to play again, they can click "Reset",
                    // which will clear the board and call initializeGame()
                    return true;
                }
            }
            count = 0;
        }
    };

    return { board, checkWinConditions };

})();

const Gameplay = (() => {

    let player1 = Player("Player One", "X");
    let player2 = Player("Player Two", "O");

    document.querySelector("#player1").textContent = `${player1.name}: ${player1.token}`;
    document.querySelector("#player2").textContent = `${player2.name}: ${player2.token}`;

    const initializeGame = (() => {

        Gameboard.board = ["", "", "", "", "", "", "", "", ""];

        // start with player one's turn
        player1.isTurn = true;
        player2.isTurn = false;

    })();

    const gameRound = (currentPlayer, opponent) => {
        //FIRST: check to make sure Gameboard.board has open spaces; If not, game is a draw
        if (!Gameboard.board.includes("")) {
            // run draw procedures
        }
        // prompt player to enter their token in any open cell
        // when entered, check to make sure cell is open
        // if open, place token in Gameboard.board
        const squares = document.querySelectorAll(".square");

        squares.forEach(square => { //redo with four loop and .querySelectorAll(".square")[i]
            square.addEventListener("click", () => {
                if (currentPlayer.isTurn && Gameboard.board[square.innerHTML] == "") {
                    Gameboard.board[square.innerHTML] = currentPlayer.token;
                    square.innerHTML = Gameboard.board[square.innerHTML]; //print token to screen
                    square.style.color = "white"; //Makes X's and O's visible
                    // Testing purposes
                    console.log(Gameboard.board);
                    // End currentPlayer's turn and check if they won
                    currentPlayer.isTurn = false;

                    if (Gameboard.checkWinConditions(currentPlayer)) {
                        return;
                    }

                    // Switch player
                    opponent.isTurn = true;
                    gameRound(opponent, currentPlayer);
                } else {
                    return;
                }
            });
        });

        // if winConditions apply, end game (turn both player's turns to false) and announce winner
        // ask player if they want to play again
        // if winConditions do not apply, make currentPlayer.isTurn = false and opponent.isTurn = true and call

        // gameRound(opponent, currentPlayer);
        // else if closed, alert player to try another square
        // 
    };

    gameRound(player1, player2); // Start first round

})();

// Suggestions:

// Separate UI manipulation into a separate module / factory function for cleaner code
// Avoid hardcoded UI manipulation: Instead of directly manipulating the DOM within the Gameplay module, consider using callbacks or events to communicate with the UI layer.This will make your code more flexible and reusable, as you can easily change the UI implementation without modifying the game logic.

// Consider error handling: It's important to handle edge cases and potential errors in your code. For example, in the gameRound function, if a player clicks on an already occupied square, the code simply returns without any indication to the user. You could display an error message or disable the square to prevent invalid moves.

