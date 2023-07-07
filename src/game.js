const Player = require('./player');
const Tetromino = require('./tetromino');

class Game {
  constructor(render) {
    this.grid = this.#createGrid(20, 10) // Generate grid made of 20 arrays, each array being made of 10 zeros.
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
    // Hard-coded initial spawn points based upon 20x10 grid
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
    this.activePlayer = this.players[0]; // Default player is player 1
  };

  moveVertical() {
    this.activeTetromino.positions.forEach((eachCoordinate) => {
      this.grid[eachCoordinate[0]][eachCoordinate[1]] = 0
    });

    this.activeTetromino.positions.forEach((blockPosition) => {
      if (this.activePlayer === 'player1') {
        blockPosition[0] += 1;
      } else {
        blockPosition[0] -= 1;
      }
    });

    this.activeTetromino.positions.forEach((eachCoordinate) => {
      this.grid[eachCoordinate[0]][eachCoordinate[1]] = this.activeTetromino.value
    })
  };
  moveHorizontal(input) {
    this.activeTetromino.positions.forEach((eachCoordinate) => {
      this.grid[eachCoordinate[0]][eachCoordinate[1]] = 0 
    });

    this.activeTetromino.positions.forEach((blockPosition) => {
      if (input === 'right') {
        blockPosition[1] += 1;
      } else if (input === 'left' ) {
        blockPosition[1] -= 1;
      }
    });

    this.activeTetromino.position.forEach((eachCoordinate) => {
        this.grid[eachCoordinate[0]][eachCoordinate[1]] = this.activeTetromino.value  
    })
  };

  generateTetromino(random) {
    this.randomIndex = (random === undefined ? Math.floor(Math.random() * 7) : random) // Ternary (random) used for testing purposes 
    let key = null;

    // Switch statement decides which key based upon the random number given
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

    // If statement receives key and adds the corresponding tetromino to the grid
    if (key === "i") {
      if (this.activePlayer = this.players[0]) {
        this.position.i.p1.forEach(arr =>
          this.grid[arr[0]][arr[1]] = this.randomIndex + 1
        );
        this.activeTetromino = new Tetromino(this.position.i.p1);
      } else {
        this.position.i.p2.forEach(arr =>
          this.grid[arr[0]][arr[1]] = this.randomIndex + 1
        );
        this.activeTetromino = new Tetromino(this.position.i.p2);
      }
    } else {
      const tetromino = this.shape[this.randomIndex];
      const position = this.position[key];
      position.forEach(arr =>
        this.grid[arr[0]][arr[1]] = this.randomIndex + 1
      );
      this.activeTetromino = new Tetromino(position)
    }
    return this.activeTetromino;
  }

  removeCompleteLines() {
    this.grid.forEach((row, index) => {
      if (row.every(cell => cell !== 0)) {
        const halfPoint = this.grid.length / 2;
        this.grid.splice(index, 1);
        this.grid.splice(index < halfPoint ? halfPoint - 1 : halfPoint, 0, new Array(this.grid[0].length).fill(0));
      }
    })
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
