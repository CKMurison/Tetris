class Render {
  constructor() {
    this.mainEl = document.querySelector('#main-container');
  }

  drawGrid(grid) {
    let gridContainer = document.createElement('div');
    gridContainer.className = 'gridContainer';
    
    grid.forEach((row) => {
      let rowContainer = document.createElement('div');
      rowContainer.className = 'rowContainer';

      row.forEach((cell) => {
        let cellContainer = document.createElement('div');
        cellContainer.className = cell === 0 ? 'empty' : 'iBlock';

        rowContainer.append(cellContainer);
      })

      gridContainer.append(rowContainer);
    })

    this.mainEl.append(gridContainer);
  }
}

module.exports = Render;