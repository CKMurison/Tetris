const Player = require('./player');

class Game {
  constructor(render) {
    this.grid = this.#createGrid(20, 10)
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
    ];
    this.render = render;
    this.players = [new Player(), new Player()];
  };

  #createGrid(rows, columns) {
    let grid = [];
    let row = new Array(10).fill(0);
    for (let i = 0 ; i < rows ; i++) {
      let row = new Array(10).fill(0);
      grid.push(row)
    }
    return grid;
  }
};

module.exports = Game;
