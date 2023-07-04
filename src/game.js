const Player = require('./player');

class Game {
  constructor() {
    const grid = Array(20).fill(Array(10).fill(0)); //first number = rows, second number = columns
    this.shape = [
      // I-Block
      [1, 1, 1, 1],
      // J-Block
      [[2, 0, 0],
      [2, 2, 2]],
      // L-Block
      [[0, 0, 3],
      [3, 3, 3]],
      //  O-Block
      [[4, 4],
      [4, 4]],
      // S-Block
      [[0, 5, 5],
      [5, 5, 0]],
      // T-Block
      [[0, 6, 0],
      [6, 6, 6]],
      // Z-Block
      [[7, 7, 0],
      [0, 7, 7]],
    ]
    const players = [new Player(), new Player()]
  };

  generateTetromino() {
    return this.shape[Math.floor(Math.random() * 7)]
  }
};

const game = new Game();

console.log(game.generateTetromino());
