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
    switch(cell){
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

  musicMuted(isMuted) {
    let musicContainer = document.querySelector('.musicMuted')
    if (isMuted) {
      musicContainer.textContent = 'Music Volume: Off'; 
    } else {
      musicContainer.textContent = 'Music Volume: On';
    }
  }
}

module.exports = Render;