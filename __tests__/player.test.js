/**
 * @jest-environment jsdom
 */

const Player = require('../src/player.js');

describe('Player', () => {
  test('incrementLineCounter() correctly increments linesCleared', () => {
    const mockGame = {
      activePlayer: 'player 1',
      players : ['player 1', 'player 2']
    }
    const player = new Player();
    player.game = mockGame;
    expect(player.linesCleared).toBe(0);
    player.incrementLineCounter();
    expect(player.linesCleared).toBe(1);
  })
})