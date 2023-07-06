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

  // src/game.js
  var require_game = __commonJS({
    "src/game.js"(exports, module) {
      var Player = require_player();
      var Game2 = class {
        constructor(render2) {
          this.grid = this.#createGrid(20, 10);
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
          this.render = render2;
          this.players = [new Player(), new Player()];
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
