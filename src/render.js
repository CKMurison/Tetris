class Render {
  constructor() {
    this.mainEl = document.querySelector('#main-container');
  }

  drawGrid(grid) {
    let gridContainer = document.createElement('div');
    gridContainer.className = 'gridContainer';
    gridContainer.style.height = "95vh"
    gridContainer.style.width = `calc(95vh / ${grid.length} * ${grid[0].length}`
    
    grid.forEach((row, rowNum) => {
      let rowContainer = document.createElement('div');
      rowContainer.className = 'rowContainer';
      
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
}

module.exports = Render;