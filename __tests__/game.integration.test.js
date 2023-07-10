/**
 * @jest-environment jsdom
 */

const Game = require('../src/game.js');
const Render = require('../src/render.js');
const fs = require('fs');

describe ('Game', () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync('./index.html');
    render = new Render()
    game = new Game(render)
  });
});