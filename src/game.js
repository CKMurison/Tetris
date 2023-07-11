const Player = require('./player');
const Tetromino = require('./tetromino');

class Game {
  constructor(render) {
    // Generate a grid; an array of 20 arrays, each of ten zeros. See public/grid for a visual
    // We mutate this grid to spawn and update the positions of the tetrominoes
    this.grid = this.#createGrid(20, 10)
    this.activeTetromino = null;
    // Hard-coded initial spawn points based upon 20x10 grid
    let midRow = this.grid.length / 2 - 1;
    let midCol = this.grid[0].length / 2 - 1;
    this.position = {
      i: {
        p1: [[midRow + 1, midCol - 1], [midRow + 1, midCol], [midRow + 1, midCol + 1], [midRow + 1, midCol + 2]],
        p2: [[midRow, midCol - 1], [midRow, midCol], [midRow, midCol + 1], [midRow, midCol + 2]]
      },
      j: [[midRow, midCol - 1], [midRow + 1, midCol - 1], [midRow + 1, midCol], [midRow + 1, midCol + 1]],
      l: [[midRow, midCol + 1], [midRow + 1, midCol + 1], [midRow + 1, midCol], [midRow + 1, midCol - 1]],
      o: [[midRow, midCol], [midRow, midCol + 1], [midRow + 1, midCol], [midRow + 1, midCol + 1]],
      s: [[midRow, midCol], [midRow, midCol + 1], [midRow + 1, midCol - 1], [midRow + 1, midCol]],
      t: [[midRow, midCol], [midRow + 1, midCol], [midRow + 1, midCol - 1], [midRow + 1, midCol + 1]],
      z: [[midRow, midCol - 1], [midRow, midCol], [midRow + 1, midCol], [midRow + 1, midCol + 1]]
    }
    this.render = render;
    this.players = [new Player(1, this), new Player(2, this)];
    this.activePlayer = this.players[(Math.floor(Math.random() * 2))]; // Default player is player 1
  };

  // The playLoop runs the game
  // Instantiate a turn-cycle loop, that breaks to allow the game to swap players
  async playLoop(test) {
    let turnInProgress = false;
    let timer = 500; // time between ticks in ms

    while (!turnInProgress) {
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
        this.removeCompleteLines()
        turnInProgress = false;
        this.swapPlayer();
      }
    }
    this.render.gameOver(this.activePlayer === this.players[0] ? 'Player2' : 'Player1');
  }

  generateTetromino(random) {
    // Returns true if a tetromino has been generated successfully
    // Returns false if the tetromino to be generated is blocked by another piece
    // And the game is over

    // Instantiate a random number in the range 0..6 and assign it to the variable this.randomIndex
    this.randomIndex = (random === undefined ? Math.floor(Math.random() * 7) : random) // Ternary (random) used for testing purposes 
    let key = null;

    // Instantiate letters as keys for each tetromino and assign to the object keyMap
    const keyMap = {
      0: "i",
      1: "j",
      2: "l",
      3: "o",
      4: "s",
      5: "t",
      6: "z"
    };

    key = keyMap[this.randomIndex];

    // If statement receives key and adds the corresponding tetromino to the grid
    // checkIfGameOver condition will stop the function from drawing on the grid

    // TODO: randomIndex to be added as an argument to new Tetromino to change its value field
    if (key === "i") {
      const position = this.activePlayer === this.players[0] ? this.position.i.p1 : this.position.i.p2;
      if (this.checkIfGameOver(position)) return false;
      this.activeTetromino = new Tetromino(JSON.parse(JSON.stringify(position)), this.randomIndex + 1);
    } else {
      const position = this.position[key];
      if (this.checkIfGameOver(position)) return false;
      this.activeTetromino = new Tetromino(JSON.parse(JSON.stringify(position)), this.randomIndex + 1);
    }

    this.activeTetromino.positions.forEach(arr =>
      this.grid[arr[0]][arr[1]] = this.randomIndex + 1
    );
    return true;
  }

  checkIfGameOver(tetrominoPositions) {
    // Helper function used in generateTetromino 
    // Compares the position of the tetromino to be spawned to this.grid to see if there is space to generate it
    // Returns a boolean

    return tetrominoPositions.some((position) => {
      // position = [row, column]
      let row = position[0]
      let column = position[1]
      return this.grid[row][column] !== 0;
    });
  }

  moveVertical() {
    this.clearTetromino();

    this.activeTetromino.positions.forEach((blockPosition) => {
      if (this.activePlayer === this.players[0]) {
        blockPosition[0] += 1;
      } else {
        blockPosition[0] -= 1;
      }
    });

    this.drawTetromino();
  };

  moveHorizontal(input) {
    if (this.activeTetromino === null) return;
    if (input == 'left' ? this.activeTetromino.checkCollisionLeft(this.grid) : this.activeTetromino.checkCollisionRight(this.grid)) return;

    this.clearTetromino();

    this.activeTetromino.positions.forEach((blockPosition) => {
      if (input === 'right') {
        blockPosition[1] += 1;
      } else if (input === 'left') {
        blockPosition[1] -= 1;
      }
    });

    this.drawTetromino();
    this.render.drawGrid(this.grid);
  };

  rotateTetromino() {
    this.anchorPoint = this.activeTetromino.positions[1]
    this.relation = []
    this.newArr = []
    this.afterTF = []
    this.clearTetromino();
    this.activeTetromino.positions.forEach(arr => {
      this.relation.push([arr[0] - this.anchorPoint[0], arr[1] - this.anchorPoint[1]])
    })

    const transformation = {
          "[-1,0]": [0, 1],
          "[0,1]": [1, 0],
          "[1,0]": [0, -1],
          "[0,-1]": [-1, 0],
          "[-1,-1]": [-1, 1],
          "[-1,1]": [1, 1],
          "[1,1]": [1, -1],
          "[1,-1]": [-1, -1],
          "[-2,0]": [0, 2],
          "[0,2]": [2, 0],
          "[2,0]": [0, -2],
          "[0,-2]": [-2, 0],
          "[0,0]" : [0, 0]
      }

    this.relation.forEach(arr => {
      this.newArr.push(transformation[JSON.stringify(arr)])
    })
    ///
    // console.log(Array.isArray(this.newArr))
  
    this.newArr.forEach(arr => {
      let row = arr[0] + this.anchorPoint[0];
      let column = arr[1] + this.anchorPoint[1];
      
      this.afterTF.push([row, column])
    })

    const collisionChecker = this.afterTF.every(pos => {
      console.log(this.activeTetromino.positions.includes(pos))
      if (this.activeTetromino.positions.includes(pos)) {
        return true;
      }
      this.grid[pos[0]][pos[1]] === 0
    })

    if(!collisionChecker) {
      return;
    }
    ///
    this.activeTetromino.positions = this.afterTF;
    this.drawTetromino();
    this.render.drawGrid(this.grid);
  }

  clearTetromino() {
    this.activeTetromino.positions.forEach((eachCoordinate) => {
      this.grid[eachCoordinate[0]][eachCoordinate[1]] = 0
    });
  }

  drawTetromino() {
    this.activeTetromino.positions.forEach(coordinate => {
      this.grid[coordinate[0]][coordinate[1]] = this.activeTetromino.value;
    });
  }

  swapPlayer() {
    this.activePlayer = (this.activePlayer === this.players[1]) ? this.players[0] : this.players[1];
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
    for (let i = 0; i < rows; i++) {
      let row = new Array(columns).fill(0);
      grid.push(row)
    }
    return grid;
  }

  async #delay(time) {
    await new Promise(resolve => setTimeout(resolve, time));
  }
};

module.exports = Game;
