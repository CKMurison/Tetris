/**
 * @jest-environment jsdom
 */

const Player = require('../src/player.js');

describe('Player', () => {
  test('incrementLineCounter() correctly increments linesCleared', () => {
    const player = new Player();
    expect(player.linesCleared).toBe(0);
    player.incrementLineCounter();
    expect(player.linesCleared).toBe(1);
  })
})