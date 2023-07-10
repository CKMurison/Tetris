const Game = require('./src/game');
const Render = require('./src/render');

const render = new Render();
const game = new Game(render);
game.playLoop();