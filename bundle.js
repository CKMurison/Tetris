(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // src/player.js
  var require_player = __commonJS({
    "src/player.js"(exports, module) {
      var Player = class {
      };
      module.exports = Player;
    }
  });

  // src/tetromino.js
  var require_tetromino = __commonJS({
    "src/tetromino.js"(exports, module) {
      var Tetromino = class {
        constructor(positions) {
          this.positions = positions;
          this.value = 1;
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
      var Player = require_player();
      var Tetromino = require_tetromino();
      var Game2 = class {
        constructor(render2) {
          this.grid = this.#createGrid(20, 10);
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
            [[7, 7, 0], [0, 7, 7]]
          ];
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
          };
          this.render = render2;
          this.players = [new Player(), new Player()];
          this.activePlayer = this.players[0];
        }
        moveVertical() {
          this.activeTetromino.position.forEach((eachCoordinate) => {
            this.grid[eachCoordinate[0]][eachCoordinate[1]] = 0;
          });
          this.activeTetromino.position.forEach((blockPosition) => {
            if (this.activePlayer === "player1") {
              blockPosition[0] += 1;
            } else {
              blockPosition[0] -= 1;
            }
          });
          this.activeTetromino.position.forEach((eachCoordinate) => {
            this.grid[eachCoordinate[0]][eachCoordinate[1]] = this.activeTetromino.value;
          });
        }
        moveHorizontal(input) {
          this.activeTetromino.position.forEach((eachCoordinate) => {
            this.grid[eachCoordinate[0]][eachCoordinate[1]] = 0;
          });
          this.activeTetromino.position.forEach((blockPosition) => {
            if (input === "right") {
              blockPosition[1] += 1;
            } else if (input === "left") {
              blockPosition[1] -= 1;
            }
          });
          this.activeTetromino.position.forEach((eachCoordinate) => {
            this.grid[eachCoordinate[0]][eachCoordinate[1]] = this.activeTetromino.value;
          });
        }
        generateTetromino(random) {
          this.randomIndex = random === void 0 ? Math.floor(Math.random() * 7) : random;
          let key = null;
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
            if (this.activePlayer = this.players[0]) {
              this.position.i.p1.forEach(
                (arr) => this.grid[arr[0]][arr[1]] = this.randomIndex + 1
              );
              this.activeTetromino = new Tetromino(this.position.i.p1);
            } else {
              this.position.i.p2.forEach(
                (arr) => this.grid[arr[0]][arr[1]] = this.randomIndex + 1
              );
              this.activeTetromino = new Tetromino(this.position.i.p2);
            }
          } else {
            const tetromino = this.shape[this.randomIndex];
            const position = this.position[key];
            position.forEach(
              (arr) => this.grid[arr[0]][arr[1]] = this.randomIndex + 1
            );
            this.activeTetromino = new Tetromino(position);
          }
          return this.activeTetromino;
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
          let row = new Array(10).fill(0);
          for (let i = 0; i < rows; i++) {
            let row2 = new Array(10).fill(0);
            grid.push(row2);
          }
          return grid;
        }
      };
      module.exports = Game2;
    }
  });

  // src/render.js
  var require_render = __commonJS({
    "src/render.js"(exports, module) {
      var Render2 = class {
        constructor() {
          this.mainEl = document.querySelector("#main-container");
        }
        drawGrid(grid) {
          let gridContainer = document.createElement("div");
          gridContainer.className = "gridContainer";
          gridContainer.style.height = "95vh";
          gridContainer.style.width = `calc(95vh / ${grid.length} * ${grid[0].length}`;
          grid.forEach((row, rowNum) => {
            let rowContainer = document.createElement("div");
            rowContainer.className = "rowContainer";
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
      };
      module.exports = Render2;
    }
  });

  // index.js
  var Game = require_game();
  var Render = require_render();
  var render = new Render();
  var game = new Game(render);
  game.grid[0][1] = 1;
  game.grid[4][1] = 5;
  game.grid[3][9] = 3;
  game.grid[6][8] = 2;
  render.drawGrid(game.grid);
})();
