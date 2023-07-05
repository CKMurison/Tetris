const Player = require('./player');

class Game {
  constructor(){
  const grid = Array(20).fill(Array(10).fill(0)); //first number = rows, second number = columns
  this.activeTetromino = null;
  this.shape = [
    // I-Block
    [1, 1, 1, 1],
    // J-Block
    [[2, 0, 0], [2, 2, 2]],
    // L-Block
    [[0, 0, 3], [3, 3, 3]],
    //  O-Block
    [[4, 4], [4, 4]],
    // S-Block
    [[0, 5, 5], [5, 5, 0]],
    // T-Block
    [[0, 6, 0], [6, 6, 6]],
    // Z-Block
    [[7, 7, 0], [0, 7, 7]],
  ]
  this.position = {
    i : {p1 : [[10,3],[10,4],[10,5],[10,6]],
         p2 : [[9,3],[9,4],[9,5],[9,6]]},
    j : [[9,3],[10,3],[10,4],[10,5]],
    l : [[9,5],[10,3],[10,4],[10,5]],
    o : [[9,4],[9,5],[10,4],[10,5]],
    s : [[9,4],[9,5],[10,3],[10,4]],
    t : [[9,4],[10,3],[10,4],[10,5]],
    z : [[9,3],[9,4],[10,4],[10,5]]
  }
  const players = [new Player(), new Player()]
  };

  generateTetromino() {

    this.activeTetromino = this.shape[Math.floor(Math.random() * 7)]
    return this.activeTetromino;
  }
};

const game = new Game();

console.log(game.generateTetromino());


//this.shape ==> position 
