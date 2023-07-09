const Player = require('./player');
const Tetromino = require('./tetromino');

class Game {
  constructor(render) {
    // Generate a grid; an array of 20 arrays, each of ten zeros. See grid in public.
    // We will mutate this grid to show the positions of the tetrominoes. 
    this.grid = this.#createGrid(20, 10)
    this.activeTetromino = null;
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

  // The playLoop runs the game
  async playLoop(test) {
    let gameOver = false;
    let turnInProgress = false;
    let timer = 100; // time between ticks in ms

    // Instantiate a turn cycle loop, using the variable turnInProgress, that breaks to allow the game to switch players
    // This only runs if the game is not over
    while (!turnInProgress && !gameOver) {
      turnInProgress = true;
      let generated = this.generateTetromino();

      if (generated) {
        let collided = this.activePlayer === this.players[0] ? this.activeTetromino.checkCollisionDown(this.grid) : this.activeTetromino.checkCollisionUp(this.grid);
        this.render.drawGrid(this.grid);
        while (!collided) {
          this.moveVertical();
          this.render.drawGrid(this.grid);
          if (!test) await this.#delay(timer);
          collided = this.activePlayer === this.players[0] ? this.activeTetromino.checkCollisionDown(this.grid) : this.activeTetromino.checkCollisionUp(this.grid);
        }
        turnInProgress = false;
        this.swapPlayer();
      }
    }
  }

  checkIfGameOver(tetrominoPositions) {
    // Returns true if any of the pieces at given coordinates are blocked by a
    // space taken on the grid
    // Returns false otherwise

    // Helper function used in generateTetromino which compares this.grid to 

    // Checks to see if 

    return tetrominoPositions.some((position) => {
      // position = [row, column]
      let row = position[0]
      let column = position[1]
      return this.grid[row][column] !== 0;
    });
  }

  generateTetromino(random) {
    // Returns true if a tetromino has been generated successfully
    // Returns false if the tetromino to be generated is blocked by another piece
    // And the game is over

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
    // checkIfGameOver condition will stop the function from drawing on the grid
    if (key === "i") {
      if (this.activePlayer === this.players[0]) {
        if (this.checkIfGameOver(this.position.i.p1)) return false;
        this.activeTetromino = new Tetromino(JSON.parse(JSON.stringify(this.position.i.p1)));
      } else {
        if (this.checkIfGameOver(this.position.i.p2)) return false;
        this.activeTetromino = new Tetromino(JSON.parse(JSON.stringify(this.position.i.p2)));
      }
    } else {
      const position = this.position[key];
      if (this.checkIfGameOver(position)) return false;
      this.activeTetromino = new Tetromino(JSON.parse(JSON.stringify(position)))
    }

    this.activeTetromino.positions.forEach(arr =>
      this.grid[arr[0]][arr[1]] = this.randomIndex + 1
    );
    return true;
  }
  moveVertical() {
    this.activeTetromino.positions.forEach((eachCoordinate) => {
      this.grid[eachCoordinate[0]][eachCoordinate[1]] = 0
    });

    this.activeTetromino.positions.forEach((blockPosition) => {
      if (this.activePlayer === this.players[0]) {
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
      } else if (input === 'left') {
        blockPosition[1] -= 1;
      }
    });

    this.activeTetromino.positions.forEach((eachCoordinate) => {
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

  swapPlayer() { // Could be refactored to a ternary operator
    if (this.activePlayer === this.players[1]) {
      this.activePlayer = this.players[0]
    } else {
      this.activePlayer = this.players[1]
    }
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

  async #delay(time) {
    await new Promise(resolve => setTimeout(resolve, time));
  }
};

module.exports = Game;
