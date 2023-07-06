const Player = require('./player');
const Tetromino = require('./tetromino');

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
    this.activePlayer = this.players[0];
  };

  moveVertical() {
    this.activeTetromino.position.forEach((eachCoordinate) => {
      this.grid[eachCoordinate[0]][eachCoordinate[1]] = 0 
    });

    this.activeTetromino.position.forEach((blockPosition) => {
      if (this.activePlayer === 'player1') {
        blockPosition[0] += 1;
      } else {
        blockPosition[0] -= 1;
      }
    });

    this.activeTetromino.position.forEach((eachCoordinate) => {
        this.grid[eachCoordinate[0]][eachCoordinate[1]] = this.activeTetromino.value  
    })
  };

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
    for (let i = 0 ; i < rows ; i++) {
      let row = new Array(10).fill(0);
      grid.push(row)
    }
    return grid;
  }
};

module.exports = Game; 
