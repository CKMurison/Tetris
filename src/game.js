const Player = require('./player');
const { bizarre } = require('./powerUps');
const Tetromino = require('./tetromino');

class Game {
  constructor(render) {
    // Generate a grid; an array of 20 arrays, each of ten zeros. See public/grid for a visual
    // We mutate this grid to spawn and update the positions of the tetrominoes
    this.gameOver = false;
    this.grid = this.#createGrid(20, 10)
    this.activeTetromino = null;
    this.isPaused = false;
    this.turnInProgress = false;
    this.newGame = false;
    this.bizarre = false;
    this.midRow = Math.floor(this.grid.length / 2 - 1);
    this.music = new Audio('media/tetris-soundtrack.mp3');
    this.musicIsStarted = false;
    this.musicIsMuted = false;
    // Hard-coded initial spawn points based upon 20x10 grid
    let midRow = Math.floor(this.grid.length / 2 - 1);
    let midCol = Math.floor(this.grid[0].length / 2 - 1);
    this.position = {
      i: {
        p1: [[this.midRow + 1, midCol - 1], [this.midRow + 1, midCol], [this.midRow + 1, midCol + 1], [this.midRow + 1, midCol + 2]],
        p2: [[this.midRow, midCol - 1], [this.midRow, midCol], [this.midRow, midCol + 1], [this.midRow, midCol + 2]]
      },
      j: {
        p1: [[this.midRow + 1, midCol - 1], [this.midRow + 2, midCol - 1], [this.midRow + 2, midCol], [this.midRow + 2, midCol + 1]],
        p2: [[this.midRow - 1, midCol - 1], [this.midRow, midCol - 1], [this.midRow, midCol], [this.midRow, midCol + 1]]
      },
      l: {
        p1: [[this.midRow + 1, midCol + 1], [this.midRow + 2, midCol + 1], [this.midRow + 2, midCol - 1], [this.midRow + 2, midCol]],
        p2: [[this.midRow - 1, midCol + 1], [this.midRow, midCol + 1], [this.midRow, midCol - 1], [this.midRow, midCol]]
      },
      o: {
        p1: [[this.midRow + 1, midCol], [this.midRow + 1, midCol + 1], [this.midRow + 2, midCol], [this.midRow + 2, midCol + 1]],
        p2: [[this.midRow - 1, midCol], [this.midRow - 1, midCol + 1], [this.midRow, midCol], [this.midRow, midCol + 1]]
      },
      s: {
        p1: [[this.midRow + 1, midCol + 1], [this.midRow + 1, midCol], [this.midRow + 2, midCol - 1], [this.midRow + 2, midCol]],
        p2: [[this.midRow - 1, midCol + 1], [this.midRow - 1, midCol], [this.midRow, midCol - 1], [this.midRow, midCol]]
      },
      t: {
        p1: [[this.midRow + 1, midCol], [this.midRow + 2, midCol], [this.midRow + 2, midCol - 1], [this.midRow + 2, midCol + 1]],
        p2: [[this.midRow - 1, midCol], [this.midRow, midCol], [this.midRow, midCol - 1], [this.midRow, midCol + 1]]
      },
      z: {
        p1: [[this.midRow + 1, midCol - 1], [this.midRow + 1, midCol], [this.midRow + 2, midCol], [this.midRow + 2, midCol + 1]],
        p2: [[this.midRow - 1, midCol - 1], [this.midRow - 1, midCol], [this.midRow + 0, midCol], [this.midRow + 0, midCol + 1]]
      }, 
      plus: {
        p1: [[this.midRow + 2, midCol - 1],[this.midRow + 2, midCol],[this.midRow + 1, midCol],[this.midRow + 3, midCol],[this.midRow + 2, midCol + 1]],
        p2: [[this.midRow - 1, midCol - 1],[this.midRow - 1, midCol],[this.midRow, midCol],[this.midRow - 2, midCol],[this.midRow - 1, midCol + 1]]
      },
      u: {
        p1: [[this.midRow + 1, midCol - 1],[this.midRow + 2, midCol],[this.midRow + 2, midCol - 1],[this.midRow + 2, midCol + 1],[this.midRow + 1, midCol + 1]],
        p2: [[this.midRow, midCol - 1],[this.midRow - 1, midCol],[this.midRow - 1, midCol - 1],[this.midRow - 1, midCol + 1],[this.midRow, midCol + 1]]
      }
    }
    this.render = render;
    this.players = [new Player(1, this), new Player(2, this)];
    this.activePlayer = this.players[(Math.floor(Math.random() * 2))]; // initial player is random
    document.addEventListener('keyup', this.commonControls);
  };

  // The playLoop runs the game
  // Instantiate a turn-cycle loop, that breaks to allow the game to swap players
  async playLoop(test) {
    this.gameInProgress = true;
    this.turnInProgress = false;
    while (!this.turnInProgress) {
      if(this.newGame) {
        this.restartGame();
        this.newGame = false;
      }
      this.turnInProgress = true;
      let timer = this.activePlayer.timer; // time between ticks in ms
      
      let generated;
      
      if (this.bizarre) {
        let random = Math.round(Math.random() + 7)
        generated = this.generateTetromino(random)
        this.bizarre = false 
      } else {
        generated = this.generateTetromino()
      }


      if (generated) {
        let collided = this.activePlayer === this.players[0] ? this.activeTetromino.checkCollisionDown(this.grid) : this.activeTetromino.checkCollisionUp(this.grid);
        this.render.drawGrid(this.grid);
        this.render.displayActivePlayer(this.activePlayer === this.players[0] ? 'Player 1' : 'Player 2');
        if (!test) await this.#delay(timer);
        while (!collided) {
          if (!this.isPaused) {
            this.moveVertical();
            this.render.drawGrid(this.grid);
            if (!test) await this.#delay(timer);
            collided = this.activePlayer === this.players[0] ? this.activeTetromino.checkCollisionDown(this.grid) : this.activeTetromino.checkCollisionUp(this.grid);
          } else if (!test) {
            await this.#delay(timer);
          }
        }
        this.removeCompleteLines()
        this.turnInProgress = false;
        this.swapPlayer();
      }
    }
    this.turnInProgress = false;
    this.render.gameOver(this.activePlayer === this.players[0] ? 'Player2' : 'Player1');
    this.gameOver = true;
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
      6: "z", 
      7: "plus",
      8: "u"
    };

    key = keyMap[this.randomIndex];
    
    // If statement receives key and adds the corresponding tetromino to the grid
    // checkIfGameOver condition will stop the function from drawing on the grid

    const position = this.activePlayer === this.players[0] ? this.position[key]['p1'] : this.position[key]['p2'];
    if (this.checkIfGameOver(position)) return false;
    this.activeTetromino = new Tetromino(JSON.parse(JSON.stringify(position)), this.randomIndex + 1);

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
    if (!this.isPaused) {
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
    }
  };

  rotateTetromino() {
    this.anchorPoint = this.activeTetromino.positions[1]
    this.relation = []
    this.newArr = []
    this.afterTF = []
    this.clearTetromino();

    if(this.activeTetromino.value === 4) {return}

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
      "[0,0]": [0, 0]
    }

    this.relation.forEach(arr => {
      this.newArr.push(transformation[JSON.stringify(arr)])
    })

    this.newArr.forEach(arr => {
      let row = arr[0] + this.anchorPoint[0];
      let column = arr[1] + this.anchorPoint[1];

      this.afterTF.push([row, column])
    })

    // possible source of disappearing tetromino bug (according to chrome's dev log)
    const positionsAsStrings = this.activeTetromino.positions.map(el => JSON.stringify(el))


    const collisionChecker = this.afterTF.every(pos => {
      if (positionsAsStrings.includes(`[${pos[0]},${pos[1]}]`)) {
        return true;
      } else {
        return this.grid[pos[0]][pos[1]] === 0
      }
    })
    // look at afterTF 
    // if afterTF's row is above 19 or below 0 
    // change the collisionChecker to false

    if (!collisionChecker) {
      return;
    }

    this.activeTetromino.positions = this.afterTF;
    this.drawTetromino();
    this.render.drawGrid(this.grid);
  }

  pauseGame() {
    if (this.isPaused === false) {
      this.isPaused = true;
      if (this.turnInProgress) {
        this.render.pauseText();
      };
    } else if (this.isPaused === true) {
      this.isPaused = false;
      this.render.removeOverlayText();
    }
  }

  restartGame() {
    this.grid = this.#createGrid(20, 10)
    this.activeTetromino = null;
    this.isPaused = false;
    this.turnInProgress = false;
    this.players[0].clearEventListeners();
    this.players[1].clearEventListeners();
    this.players = [new Player(1, this), new Player(2, this)];
    this.activePlayer = this.players[(Math.floor(Math.random() * 2))];
    this.render.removeOverlayText();
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
    let index = 0
    while (index < this.grid.length) {
      if (this.grid[index].every(cell => cell !== 0)) {
        const halfPoint = this.grid.length / 2;
        this.grid.splice(index, 1);
        this.grid.splice(index < halfPoint ? halfPoint - 1 : halfPoint, 0, new Array(this.grid[0].length).fill(0));
        this.activePlayer.incrementLineCounter();
      } else {
        index++;
      }
    }
  }

  #createGrid(rows, columns) {
    let grid = [];
    for (let i = 0; i < rows; i++) {
      let row = new Array(columns).fill(0);
      grid.push(row)
    }
    return grid;
  }

  // music starts if you click or press any button, but music doesn't start in Firefox by pressing the arrows (to be checked/fixed)
  playMusic() {
    this.music.loop = true;
    this.music.autoplay = false;
    this.music.volume = 0.1;
    this.music.muted = false;

    document.addEventListener("click", () => { 
      if(this.musicIsStarted === false) {
        this.musicIsStarted = true;
        this.music.play();
      }
    });

    document.addEventListener("keydown", () => {
      if(this.musicIsStarted === false) {
        this.musicIsStarted = true;
        this.music.play();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "m" && this.musicIsStarted === true) {
        this.music.muted = !this.music.muted;
        this.render.musicMuted(this.music.muted);
      } else if (event.key === "m" && this.musicIsStarted === false) {
        this.musicIsStarted = true;
        this.music.play();
        this.render.musicMuted(this.music.muted);
      }
    });
  }

  commonControls = (e) => {
    if (e.key == "r") {
        if (this.gameOver) {
            this.gameOver = false;
            this.render.removeOverlayText();
            this.restartGame();
            this.playLoop();
        } else {
            this.newGame = true;
            this.isPaused = false;
            this.render.restartText();
        }
    } else if (e.key == " ") {
        this.pauseGame();
    }
}

  async #delay(time) {
    await new Promise(resolve => setTimeout(resolve, time));
  }
};

module.exports = Game;
