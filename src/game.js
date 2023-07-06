const Player = require('./player');

class Game {
  constructor(render) {
    this.grid = this.#createGrid(20, 10)
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
      i: {
        p1: [[10, 3], [10, 4], [10, 5], [10, 6]],
        p2: [[9, 3], [9, 4], [9, 5], [9, 6]]
      },
      j: [[9, 3], [10, 3], [10, 4], [10, 5]],
      l: [[9, 5], [10, 3], [10, 4], [10, 5]],
      o: [[9, 4], [9, 5], [10, 4], [10, 5]],
      s: [[9, 4], [9, 5], [10, 3], [10, 4]],
      t: [[9, 4], [10, 3], [10, 4], [10, 5]],
      z: [[9, 3], [9, 4], [10, 4], [10, 5]]
    }
    this.render = render;
    this.players = [new Player(), new Player()];
  };

  generateTetromino() {
    this.randomIndex = Math.floor(Math.random() * 7)
    let key = null

    switch (this.randomIndex) {
      case 0:
        key = "i";
        break;
      case 1:
        key = "j";
        break;
      case 2:
        key = "l";
        break;
      case 3:
        key = "o";
        break;
      case 4:
        key = "s";
        break;
      case 5:
        key = "t";
        break;
      case 6:
        key = "z";
        break;
    }

    if (key === "i") {
      if (true) {
        this.position.i.p1.forEach(arr =>
          this.grid[arr[0]][arr[1]] = this.randomIndex + 1
        );
      } else {
        this.position.i.p2.forEach(arr =>
          this.grid[arr[0]][arr[1]] = this.randomIndex + 1
        );
      }
    } else {
      const tetromino = this.shape[this.randomIndex];
      const position = this.position[key];
      position.forEach(arr =>
        this.grid[arr[0]][arr[1]] = this.randomIndex + 1
      );
    }

    this.activeTetromino = this.shape[this.randomIndex]
    return this.activeTetromino;
  }

  #createGrid(rows, columns) {
    let grid = [];
    let row = new Array(10).fill(0);
    for (let i = 0; i < rows; i++) {
      let row = new Array(10).fill(0);
      grid.push(row)
    }
    return grid;
  }
};

module.exports = Game;

const game = new Game();
game.generateTetromino()
console.log(game.grid)

// game.position.i.p1.forEach(arr => 
//   console.log(arr[0] + "<- row\n" + arr[1] + "<- column\n")
//   )

// game.position.i.p1.forEach(arr => 
//   this.grid[arr[0]][arr[1]] = randomIndex + 1
//   )

//this.shape ==> position 
