const Game = require('./src/game');
const Render = require('./src/render');

const render = new Render();
const game = new Game(render);
game.grid[0][1] = 1;
game.grid[4][1] = 5;
game.grid[3][9] = 3;
game.grid[6][8] = 2;
render.drawGrid(game.grid);