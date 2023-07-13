const Game = require('./game');

class Render {
  constructor() {
    this.mainEl = document.querySelector('#main-container');
  }

  drawGrid(grid) {
    if (document.querySelector('.gridContainer') !== null) {
      document.querySelector('.gridContainer').remove();
    }

    let gridContainer = document.createElement('div');
    gridContainer.className = 'gridContainer';
    gridContainer.style.height = "95vh"
    gridContainer.style.width = `calc(95vh / ${grid.length} * ${grid[0].length}`

    grid.forEach((row, rowNum) => {
      let rowContainer = document.createElement('div');
      rowContainer.className = 'rowContainer';
      rowContainer.id = `row${rowNum}`;

      row.forEach((cell, colNum) => {
        let cellContainer = document.createElement('div');
        cellContainer.className = "cellContainer";
        cellContainer.className += ` ${this.#findClassName(cell)}`;
        cellContainer.id = `${rowNum}.${colNum}`;

        rowContainer.append(cellContainer);
      })

      gridContainer.append(rowContainer);
    })

    this.mainEl.append(gridContainer);
    this.findSpawnLine(grid);
  }

  findSpawnLine(grid) {
    let spawnRow = document.querySelector(`#row${grid.length / 2 - 1}`);
    if (spawnRow !== null) spawnRow.className += " spawnRow";
  }

  #findClassName(cell) {
    switch (cell) {
      case 0:
        return 'empty';
      case 1:
        return 'iBlock'
      case 2:
        return 'jBlock'
      case 3:
        return 'lBlock'
      case 4:
        return 'oBlock'
      case 5:
        return 'sBlock'
      case 6:
        return 'tBlock'
      case 7:
        return 'zBlock'
    }
  }

   pauseText() {
    this.removeOverlayText();
    let pauseContainer = document.createElement('div')
    pauseContainer.className = 'overlay'
    pauseContainer.innerHTML = "game paused<br>press r to restart";
    this.mainEl.append(pauseContainer);
    document.querySelectorAll('.cellContainer').forEach((el) => {
      el.style.animationName = "cellAnimation";
    })
  };
  
  restartText() {
    this.removeOverlayText();
    let restartContainer = document.createElement('div')
    restartContainer.className = 'overlay'
    restartContainer.textContent = 'New Game Incoming';
    this.mainEl.append(restartContainer);
    document.querySelectorAll('.cellContainer').forEach((el) => {
      el.style.animationName = "cellAnimation";
    })
 };
 
  gameOver(player) {
    this.removeOverlayText();
    let gameOverContainer = document.createElement('div')
    gameOverContainer.className = 'overlay'
    gameOverContainer.innerHTML = player === 'Player1' ? 'Player 1 Wins!<br>press r to restart' : 'Player 2 Wins!<br>press r to restart';
    // this.removeRestartText();
    this.mainEl.append(gameOverContainer);
    document.querySelectorAll('.cellContainer').forEach((el) => {
      el.style.animationName = "cellAnimation";
    })
  };

  removeOverlayText() {
    const overlayText = document.querySelector('.overlay')
    if(overlayText !== null) overlayText.remove();
  };
}

module.exports = Render;