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
    let pauseContainer = document.createElement('div')
    pauseContainer.className = 'pause'
    pauseContainer.textContent = 'paused';
    this.mainEl.append(pauseContainer);
    document.querySelectorAll('.cellContainer').forEach((el) => {
      el.style.animationName = "cellAnimation";
    })
  };

  restartButton() {
    let restartContainer = document.createElement('div');
    let button = document.createElement('button');
    button.id = 'restart_button'
    restartContainer.className = 'restart';
    restartContainer.textContent = '↻';
    restartContainer.append(button);

    // Add event listener for click event
    button.addEventListener('click', () => {
      // Code to execute when the button is clicked
      // For example, you can call a function to handle the restart logic
      this.game.restartGame();
      console.log('button clicked')
    });

    this.mainEl.appendChild(restartContainer);

  }

  removePauseText() {
    document.querySelector('.pause').remove();

  };

  gameOver(player) {
    let gameOverContainer = document.createElement('div')
    gameOverContainer.className = 'gameOver'
    gameOverContainer.textContent = player === 'Player1' ? 'Player 1 Wins!' : 'Player 2 Wins!';
    this.mainEl.append(gameOverContainer);
    document.querySelectorAll('.cellContainer').forEach((el) => {
      el.style.animationName = "cellAnimation";
    })
  };
}

module.exports = Render;