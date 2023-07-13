(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // src/player.js
  var require_player = __commonJS({
    "src/player.js"(exports, module) {
      var Player2 = class {
        constructor(player, game2) {
          this.activePlayer = player;
          this.game = game2;
          this.controls();
        }
        controls() {
          document.addEventListener("keydown", (e) => {
            if (this.activePlayer === 1) {
              if (e.key === "ArrowLeft") {
                this.game.moveHorizontal("left");
              } else if (e.key === "ArrowRight") {
                this.game.moveHorizontal("right");
              } else if (e.key === "ArrowUp") {
                this.game.rotateTetromino();
              }
            } else {
              if (e.key === "a") {
                this.game.moveHorizontal("left");
              } else if (e.key === "d") {
                this.game.moveHorizontal("right");
              } else if (e.key === "s") {
                this.game.rotateTetromino();
              }
            }
          });
          document.addEventListener("keyup", (e) => {
            if (e.key == " " && this.activePlayer === 1) {
              this.game.pauseGame();
            }
          });
          document.addEventListener("keyup", (e) => {
            if (e.key == "r" && this.activePlayer === 1) {
              if (this.game.gameOver) {
                this.game.gameOver = false;
                this.game.render.removeOverlayText();
                this.game.restartGame();
                this.game.playLoop();
              } else {
                this.game.newGame = true;
                this.game.isPaused = false;
                this.game.render.restartText();
                console.log("buttonPressed");
              }
            }
          });
        }
      };
      module.exports = Player2;
    }
  });

  // src/tetromino.js
  var require_tetromino = __commonJS({
    "src/tetromino.js"(exports, module) {
      var Tetromino = class {
        constructor(positions, value) {
          this.positions = positions;
          this.value = value;
        }
        checkCollisionDown(grid) {
          let collision = false;
          this.positions.forEach((position) => {
            const filter = this.positions.filter((e) => e[0] === position[0] + 1 && e[1] === position[1]);
            if (filter.length === 1)
              return;
            if (position[0] >= grid.length - 1) {
              collision = true;
            } else if (grid[position[0] + 1][position[1]] !== 0) {
              collision = true;
            }
          });
          return collision;
        }
        checkCollisionUp(grid) {
          let collision = false;
          this.positions.forEach((position) => {
            const filter = this.positions.filter((e) => e[0] === position[0] - 1 && e[1] === position[1]);
            if (filter.length === 1)
              return;
            if (position[0] === 0) {
              collision = true;
            } else if (grid[position[0] - 1][position[1]] !== 0) {
              collision = true;
            }
          });
          return collision;
        }
        checkCollisionRight(grid) {
          let collision = false;
          this.positions.forEach((position) => {
            const filter = this.positions.filter((e) => e[0] === position[0] && e[1] === position[1] + 1);
            if (filter.length === 1)
              return;
            if (position[1] >= grid[0].length - 1) {
              collision = true;
            } else if (grid[position[0]][position[1] + 1] !== 0) {
              collision = true;
            }
          });
          return collision;
        }
        checkCollisionLeft(grid) {
          let collision = false;
          this.positions.forEach((position) => {
            const filter = this.positions.filter((e) => e[0] === position[0] && e[1] === position[1] - 1);
            if (filter.length === 1)
              return;
            if (position[1] === 0) {
              collision = true;
            } else if (grid[position[0]][position[1] - 1] !== 0) {
              collision = true;
            }
          });
          return collision;
        }
      };
      module.exports = Tetromino;
    }
  });

  // src/game.js
  var require_game = __commonJS({
    "src/game.js"(exports, module) {
      var Player2 = require_player();
      var Tetromino = require_tetromino();
      var Game2 = class {
        constructor(render2) {
          this.gameOver = false;
          this.grid = this.#createGrid(20, 10);
          this.activeTetromino = null;
          this.isPaused = false;
          this.turnInProgress = false;
          this.newGame = false;
          let midRow = Math.floor(this.grid.length / 2 - 1);
          let midCol = Math.floor(this.grid[0].length / 2 - 1);
          this.position = {
            i: {
              p1: [[midRow + 1, midCol - 1], [midRow + 1, midCol], [midRow + 1, midCol + 1], [midRow + 1, midCol + 2]],
              p2: [[midRow, midCol - 1], [midRow, midCol], [midRow, midCol + 1], [midRow, midCol + 2]]
            },
            j: {
              p1: [[midRow + 1, midCol - 1], [midRow + 2, midCol - 1], [midRow + 2, midCol], [midRow + 2, midCol + 1]],
              p2: [[midRow - 1, midCol - 1], [midRow, midCol - 1], [midRow, midCol], [midRow, midCol + 1]]
            },
            l: {
              p1: [[midRow + 1, midCol + 1], [midRow + 2, midCol + 1], [midRow + 2, midCol - 1], [midRow + 2, midCol]],
              p2: [[midRow - 1, midCol + 1], [midRow, midCol + 1], [midRow, midCol - 1], [midRow, midCol]]
            },
            o: {
              p1: [[midRow + 1, midCol], [midRow + 1, midCol + 1], [midRow + 2, midCol], [midRow + 2, midCol + 1]],
              p2: [[midRow - 1, midCol], [midRow - 1, midCol + 1], [midRow, midCol], [midRow, midCol + 1]]
            },
            s: {
              p1: [[midRow + 1, midCol + 1], [midRow + 1, midCol], [midRow + 2, midCol - 1], [midRow + 2, midCol]],
              p2: [[midRow - 1, midCol + 1], [midRow - 1, midCol], [midRow, midCol - 1], [midRow, midCol]]
            },
            t: {
              p1: [[midRow + 1, midCol], [midRow + 2, midCol - 1], [midRow + 2, midCol], [midRow + 2, midCol + 1]],
              p2: [[midRow - 1, midCol], [midRow, midCol - 1], [midRow, midCol], [midRow, midCol + 1]]
            },
            z: {
              p1: [[midRow + 1, midCol - 1], [midRow + 1, midCol], [midRow + 2, midCol], [midRow + 2, midCol + 1]],
              p2: [[midRow - 1, midCol - 1], [midRow - 1, midCol], [midRow + 0, midCol], [midRow + 0, midCol + 1]]
            }
          };
          this.render = render2;
          this.players = [new Player2(1, this), new Player2(2, this)];
          this.activePlayer = this.players[Math.floor(Math.random() * 2)];
        }
        // The playLoop runs the game
        // Instantiate a turn-cycle loop, that breaks to allow the game to swap players
        async playLoop(test) {
          this.gameInProgress = true;
          this.turnInProgress = false;
          let timer = 30;
          while (!this.turnInProgress) {
            if (this.newGame) {
              this.restartGame();
              this.newGame = false;
            }
            this.turnInProgress = true;
            let generated = this.generateTetromino();
            if (generated) {
              let collided = this.activePlayer === this.players[0] ? this.activeTetromino.checkCollisionDown(this.grid) : this.activeTetromino.checkCollisionUp(this.grid);
              this.render.drawGrid(this.grid);
              while (!collided) {
                if (!this.isPaused) {
                  this.moveVertical();
                  this.render.drawGrid(this.grid);
                  if (!test)
                    await this.#delay(timer);
                  collided = this.activePlayer === this.players[0] ? this.activeTetromino.checkCollisionDown(this.grid) : this.activeTetromino.checkCollisionUp(this.grid);
                } else if (!test) {
                  await this.#delay(timer);
                }
              }
              this.removeCompleteLines();
              this.turnInProgress = false;
              this.swapPlayer();
            }
          }
          this.turnInProgress = false;
          this.render.gameOver(this.activePlayer === this.players[0] ? "Player2" : "Player1");
          this.gameOver = true;
        }
        generateTetromino(random) {
          this.randomIndex = random === void 0 ? Math.floor(Math.random() * 7) : random;
          let key = null;
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
          const position = this.activePlayer === this.players[0] ? this.position[key]["p1"] : this.position[key]["p2"];
          if (this.checkIfGameOver(position))
            return false;
          this.activeTetromino = new Tetromino(JSON.parse(JSON.stringify(position)), this.randomIndex + 1);
          this.activeTetromino.positions.forEach(
            (arr) => this.grid[arr[0]][arr[1]] = this.randomIndex + 1
          );
          return true;
        }
        checkIfGameOver(tetrominoPositions) {
          return tetrominoPositions.some((position) => {
            let row = position[0];
            let column = position[1];
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
        }
        moveHorizontal(input) {
          if (!this.isPaused) {
            if (this.activeTetromino === null)
              return;
            if (input == "left" ? this.activeTetromino.checkCollisionLeft(this.grid) : this.activeTetromino.checkCollisionRight(this.grid))
              return;
            this.clearTetromino();
            this.activeTetromino.positions.forEach((blockPosition) => {
              if (input === "right") {
                blockPosition[1] += 1;
              } else if (input === "left") {
                blockPosition[1] -= 1;
              }
            });
            this.drawTetromino();
            this.render.drawGrid(this.grid);
          }
        }
        rotateTetromino() {
          this.anchorPoint = this.activeTetromino.positions[1];
          this.relation = [];
          this.newArr = [];
          this.afterTF = [];
          this.clearTetromino();
          this.activeTetromino.positions.forEach((arr) => {
            this.relation.push([arr[0] - this.anchorPoint[0], arr[1] - this.anchorPoint[1]]);
          });
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
          };
          this.relation.forEach((arr) => {
            this.newArr.push(transformation[JSON.stringify(arr)]);
          });
          this.newArr.forEach((arr) => {
            let row = arr[0] + this.anchorPoint[0];
            let column = arr[1] + this.anchorPoint[1];
            this.afterTF.push([row, column]);
          });
          const positionsAsStrings = this.activeTetromino.positions.map((el) => JSON.stringify(el));
          const collisionChecker = this.afterTF.every((pos) => {
            if (positionsAsStrings.includes(`[${pos[0]},$${pos[1]}]`)) {
              return true;
            } else {
              return this.grid[pos[0]][pos[1]] === 0;
            }
          });
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
            }
            ;
          } else if (this.isPaused === true) {
            this.isPaused = false;
            this.render.removeOverlayText();
          }
        }
        restartGame() {
          this.grid = this.#createGrid(20, 10);
          this.activeTetromino = null;
          this.isPaused = false;
          this.turnInProgress = false;
          this.players = [new Player2(1, this), new Player2(2, this)];
          this.activePlayer = this.players[Math.floor(Math.random() * 2)];
          this.render.removeOverlayText();
        }
        clearTetromino() {
          this.activeTetromino.positions.forEach((eachCoordinate) => {
            this.grid[eachCoordinate[0]][eachCoordinate[1]] = 0;
          });
        }
        drawTetromino() {
          this.activeTetromino.positions.forEach((coordinate) => {
            this.grid[coordinate[0]][coordinate[1]] = this.activeTetromino.value;
          });
        }
        swapPlayer() {
          this.activePlayer = this.activePlayer === this.players[1] ? this.players[0] : this.players[1];
        }
        removeCompleteLines() {
          this.grid.forEach((row, index) => {
            if (row.every((cell) => cell !== 0)) {
              const halfPoint = this.grid.length / 2;
              this.grid.splice(index, 1);
              this.grid.splice(index < halfPoint ? halfPoint - 1 : halfPoint, 0, new Array(this.grid[0].length).fill(0));
            }
          });
        }
        #createGrid(rows, columns) {
          let grid = [];
          for (let i = 0; i < rows; i++) {
            let row = new Array(columns).fill(0);
            grid.push(row);
          }
          return grid;
        }
        async #delay(time) {
          await new Promise((resolve) => setTimeout(resolve, time));
        }
      };
      module.exports = Game2;
    }
  });

  // src/render.js
  var require_render = __commonJS({
    "src/render.js"(exports, module) {
      var Game2 = require_game();
      var Render2 = class {
        constructor() {
          this.mainEl = document.querySelector("#main-container");
        }
        drawGrid(grid) {
          if (document.querySelector(".gridContainer") !== null) {
            document.querySelector(".gridContainer").remove();
          }
          let gridContainer = document.createElement("div");
          gridContainer.className = "gridContainer";
          gridContainer.style.height = "95vh";
          gridContainer.style.width = `calc(95vh / ${grid.length} * ${grid[0].length}`;
          grid.forEach((row, rowNum) => {
            let rowContainer = document.createElement("div");
            rowContainer.className = "rowContainer";
            rowContainer.id = `row${rowNum}`;
            row.forEach((cell, colNum) => {
              let cellContainer = document.createElement("div");
              cellContainer.className = "cellContainer";
              cellContainer.className += ` ${this.#findClassName(cell)}`;
              cellContainer.id = `${rowNum}.${colNum}`;
              rowContainer.append(cellContainer);
            });
            gridContainer.append(rowContainer);
          });
          this.mainEl.append(gridContainer);
          this.findSpawnLine(grid);
        }
        findSpawnLine(grid) {
          let spawnRow = document.querySelector(`#row${grid.length / 2 - 1}`);
          if (spawnRow !== null)
            spawnRow.className += " spawnRow";
        }
        #findClassName(cell) {
          switch (cell) {
            case 0:
              return "empty";
            case 1:
              return "iBlock";
            case 2:
              return "jBlock";
            case 3:
              return "lBlock";
            case 4:
              return "oBlock";
            case 5:
              return "sBlock";
            case 6:
              return "tBlock";
            case 7:
              return "zBlock";
          }
        }
        pauseText() {
          this.removeOverlayText();
          let pauseContainer = document.createElement("div");
          pauseContainer.className = "overlay";
          pauseContainer.textContent = "paused";
          this.mainEl.append(pauseContainer);
          document.querySelectorAll(".cellContainer").forEach((el) => {
            el.style.animationName = "cellAnimation";
          });
        }
        restartText() {
          this.removeOverlayText();
          let restartContainer = document.createElement("div");
          restartContainer.className = "overlay";
          restartContainer.textContent = "New Game Incoming";
          this.mainEl.append(restartContainer);
          document.querySelectorAll(".cellContainer").forEach((el) => {
            el.style.animationName = "cellAnimation";
          });
        }
        gameOver(player) {
          this.removeOverlayText();
          let gameOverContainer = document.createElement("div");
          gameOverContainer.className = "overlay";
          gameOverContainer.textContent = player === "Player1" ? "Player 1 Wins!" : "Player 2 Wins!";
          this.mainEl.append(gameOverContainer);
          document.querySelectorAll(".cellContainer").forEach((el) => {
            el.style.animationName = "cellAnimation";
          });
        }
        removeOverlayText() {
          const overlayText = document.querySelector(".overlay");
          if (overlayText !== null)
            overlayText.remove();
        }
      };
      module.exports = Render2;
    }
  });

  // index.js
  var Game = require_game();
  var Render = require_render();
  var Player = require_player();
  var render = new Render();
  var game = new Game(render);
  game.playLoop();
})();
