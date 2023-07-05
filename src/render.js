class Render {
  constructor() {
    this.mainEl = document.querySelector('#main-container');
  }

  drawGrid(grid) {
    let gridContainer = document.createElement('div');
    gridContainer.className = 'gridContainer';
    
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
        break;
      case 1:
        return 'iBlock'
        break;
      case 2:
        return 'jBlock'
        break;
      case 3:
        return 'lBlock'
        break;
      case 4:
        return 'oBlock'
        break;
      case 5:
        return 'sBlock'
        break;
      case 6:
        return 'tBlock'
        break;
      case 7:
        return 'zBlock'
        break;
    }
  }
}

module.exports = Render;