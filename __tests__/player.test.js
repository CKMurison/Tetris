/**
 * @jest-environment jsdom
 */

const Player = require('../src/player.js');
const fs = require('fs');

describe('Player', () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync('./index.html');
  })
  test('incrementLineCounter() correctly increments linesCleared', () => {
    const mockGame = {
      activePlayer: 'player 1',
      players : ['player 1', 'player 2']
    }
    const player = new Player(1, mockGame);
    expect(player.linesCleared).toBe(0);
    player.incrementLineCounter();
    expect(player.linesCleared).toBe(1);
    expect(player.nextPowerUp).toBe(1);
    expect(document.querySelector(`#linesClearedP1`).textContent).toBe('1');
  })
})