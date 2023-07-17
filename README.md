# Tic Tac Toe

## Introduction

Inspiration for this project came from [the Odin Project curriculum](https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe). At first, I was most interested in practicing writing better code by focusing more intentionally on encapsulation -- i.e., limiting public access to an object's internal variables and methods. After building a functional version of Tic Tac Toe (albeit, a rather boring one), I decided to tackle another challenge: implement an algorithm to play Tic Tac Toe perfectly. I planned to integrate my algorithm with my original version of Tic Tac Toe, but I ended up changing some fundamental patterns that made building a new UI easier than integration. (For example, in my first version of the game I labeled the Tic Tac Toe squares 0 - 8, but in the second one I labeled the squares by rows (0 - 2) and columns (0 - 2), which I found more intuitive to work with.)

You can play the two-player game [here](https://jordanccox.github.io/tic-tac-toe/) or the one-player vs. algorithm version [here](https://jordanccox.github.io/tic-tac-toe/human-vs-computer) (coming soon).

## Design Patterns

Initially, I built this game to practice two object-oriented design patterns: **factory functions** and **modules**.

### Factory Functions

A factory function is a function that, when called, returns an object. In this project, I needed two player objects. I had a few tools at my disposal to accomplish this: I could have used a constructor function, a class (JavaScript syntactic sugar that makes working with constructor functions easier to grasp), or a factory function. I chose the last option (you can read about some of the benefits of factory functions over constructors [here](https://www.theodinproject.com/lessons/node-path-javascript-factory-functions-and-the-module-pattern)) and implemented it in the following way:

```
const Player = (playerName, symbol) => {
    let name = playerName;
    let token = symbol;
    let isTurn = false;

    return { name, token, isTurn };
};
```

Later in my code, when I needed to initialize instances of the Player object, I did so by typing `let player1 = Player("Player One", "X");` and `let player2 = Player("Player Two", "O");`. Now, I had two Player instances with unique `name` and `token` properties and `isTurn` properties that I could toggle to determine which player's turn it was throughout the game.

### Modules

Modules are similar to factory functions in that they are functions that return an object; however, the difference is modules will return exactly one object instance. They are implemented using an [Immediately Invoked Function Expression (IIFE)](https://developer.mozilla.org/en-US/docs/Glossary/IIFE), which means the instance of the object is created right after the function is read by the interpreter.

One of the places I used this pattern was in constructing a Gameboard object. Since there is only one gameboard, I only needed one instance of this object:

```
const Gameboard = (() => {

    const board = [];

    const WIN_CONDITIONS = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [6, 4, 2], [0, 4, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8]];

    const checkWinConditions = (player) => {
        // Do stuff and things here
    };

    return { board, checkWinConditions };

})();
```

The key pieces of this function are the beginning `(` and ending `)()` which wrap the contents of the function. The ending `()` is comparable to a regular function call you might use somewhere else in your code such as `myFunctionThatDoesAThing()`, except that it occurs right after the function expression, therefore executing it immediately.

## Creating the Perfect Player with a Minimax Algorithm
