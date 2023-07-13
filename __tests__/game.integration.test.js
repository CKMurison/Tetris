/**
 * @jest-environment jsdom
 */

const Game = require('../src/game.js');
const Render = require('../src/render.js');
const fs = require('fs');

describe('Game', () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync('./index.html');   
    render = new Render(true)
    game = new Game(render)
  });

  test('it correctly assigns an active player', () => {
    game.playLoop(test);
    expect(game.activePlayer).not.toEqual(null)
  })

  test('press left p1', () => {
    game.activePlayer = game.players[0];
    game.generateTetromino(0)
    const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    document.dispatchEvent(event);
    expect(game.grid).toEqual(
      [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]
    )
  })

  test('press left p1', () => {
    game.activePlayer = game.players[0];
    game.generateTetromino(1)
    const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    document.dispatchEvent(event);
    expect(game.grid).toEqual(
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 2, 2, 2, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
    )
  })

  test('press right p1', () => {
    game.activePlayer = game.players[0];
    game.generateTetromino(2)
    const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    document.dispatchEvent(event);
    expect(game.grid).toEqual(
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 3, 0, 0, 0],
            [0, 0, 0, 0, 3, 3, 3, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
    )
  })

test('press left p2', () => {
  game.activePlayer = game.players[1];
  game.generateTetromino(3);
  const event = new KeyboardEvent('keydown', { key: 'a' });
  document.dispatchEvent(event);
  expect(game.grid).toEqual(
      [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 4, 4, 0, 0, 0, 0, 0],
          [0, 0, 0, 4, 4, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]
  )
})

  test('press right p2', () => {
    game.activePlayer = game.players[1];
    game.generateTetromino(4)
    const event = new KeyboardEvent('keydown', { key: 'd' });
    document.dispatchEvent(event);
    expect(game.grid).toEqual(
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 5, 5, 0, 0, 0],
            [0, 0, 0, 0, 5, 5, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
    )
})

test('press left p1 twice', () => {
  game.activePlayer = game.players[0];
  game.generateTetromino(4)
  const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
  document.dispatchEvent(event);
  document.dispatchEvent(event);
  console.log(game.grid)
  expect(game.grid).toEqual(
      [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 5, 5, 0, 0, 0, 0, 0, 0],
        [0, 5, 5, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]
    )
  })

  test('press left p1 twice', () => {
    game.activePlayer = game.players[0];
    game.generateTetromino(0)
    const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    document.dispatchEvent(event);
    document.dispatchEvent(event);
    expect(game.grid).toEqual(
      [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]
    )
  })

  test('initial rotation test - check piece spawns', () => {
    game.activePlayer = game.players[0];
    game.generateTetromino(6)
    expect(game.activeTetromino).toEqual({ "positions": [[10, 3], [10, 4], [11, 4], [11, 5]], "value": 7 })
  })

  test('rotation test 2 - method returns anchor point', () => {
    game.activePlayer = game.players[0];
    game.generateTetromino(6)
    game.rotateTetromino()
    expect(game.relation).toEqual([[0, -1], [0, 0], [1, 0], [1, 1]])
  })

  test('rotation test 3 - testing transformation of relation', () => {
    game.activePlayer = game.players[0];
    game.generateTetromino(6)
    game.rotateTetromino()
    expect(game.newArr).toEqual([[-1, 0], [0, 0], [0, -1], [1, -1]])
  })

  test('rotation test 4 - testing new position inside method', () => {
    game.activePlayer = game.players[0];
    game.generateTetromino(6)
    game.rotateTetromino()
    expect(game.afterTF).toEqual([[9, 4], [10, 4], [10, 3], [11, 3]])
  })

  test('rotation test 5 - testing anchorPoint', () => {
    game.activePlayer = game.players[0];
    game.generateTetromino(6)
    game.rotateTetromino()
    expect(game.anchorPoint).toEqual([10, 4])
  })

  test('rotation test 6 - testing new position for activeTetromino', () => {
    game.activePlayer = game.players[0];
    game.generateTetromino(6)
    game.rotateTetromino()
    expect(game.activeTetromino.positions).toEqual([[9, 4], [10, 4], [10, 3], [11, 3]])
  })

  test('rotation test 7 - testing placement on grid', () => {
    game.activePlayer = game.players[0];
    game.generateTetromino(6)
    game.rotateTetromino()
    console.log(game.grid)
    expect(game.grid).toEqual(      
      [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 7, 0, 0, 0, 0, 0],
        [0, 0, 0, 7, 7, 0, 0, 0, 0, 0],
        [0, 0, 0, 7, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ])
  })

  xtest('rotation test 6 (L-Piece) - testing new position for activeTetromino', () => {
    game.activePlayer = game.players[0];
    game.generateTetromino(2)
    game.rotateTetromino()
    expect(game.grid).toEqual(
      [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 3, 3, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
    )
  })

  test('rotation test 6 (I-Piece P1) - testing new position for activeTetromino', () => {
    game.activePlayer = game.players[0];
    game.generateTetromino(0)
    game.rotateTetromino()
    expect(game.grid).toEqual(
      [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
    )
  })

  test('rotation test 6 (I-Piece P2) - testing new position for activeTetromino', () => {
    game.activePlayer = game.players[1];
    game.generateTetromino(0)
    game.rotateTetromino()
    expect(game.grid).toEqual(
      [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
    )
  })

  test("Updates the position of the I-Block for Player 1", () => {
    mockTetromino = { positions: [[2, 0], [2, 1], [2, 2], [2, 3]], value: 1 }
    game.activeTetromino = mockTetromino;
    game.activePlayer = game.players[0]
    game.moveVertical();
    expect(game.activeTetromino.positions).toEqual([[3, 0], [3, 1], [3, 2], [3, 3]]);
    expect(game.grid[2]).not.toContain(1)
  });

  test("Updates the position of the I-block for player 2", () => {
    mockTetromino = { positions: [[2, 0], [2, 1], [2, 2], [2, 3]], value: 1 }
    game.activeTetromino = mockTetromino
    game.activePlayer = game.players[1];
    game.moveVertical();
    expect(game.activeTetromino.positions).toEqual([[1, 0], [1, 1], [1, 2], [1, 3]])
  });

  test("Updates the position of the J-block for player 1", () => {
    mockTetromino = { positions: [[1, 0], [2, 0], [2, 1], [2, 2]], value: 1 }
    game.activeTetromino = mockTetromino
    game.activePlayer = game.players[0]
    game.moveVertical();
    expect(game.activeTetromino.positions).toEqual([[2, 0], [3, 0], [3, 1], [3, 2]])
    expect(game.grid[1]).not.toContain(1)
  });

  test("Updates the position of the J-block for player 2", () => {
    mockTetromino = { positions: [[1, 0], [2, 0], [2, 1], [2, 2]], value: 1 }
    game.activeTetromino = mockTetromino
    game.activePlayer = game.players[1];
    game.moveVertical();
    expect(game.activeTetromino.positions).toEqual([[0, 0], [1, 0], [1, 1], [1, 2]])
  });

  test("Updates the position of the l-block for player 1", () => {
    mockTetromino = { positions: [[1, 0], [1, 1], [1, 2], [2, 0]], value: 1 }
    game.activeTetromino = mockTetromino
    game.activePlayer = game.players[0]
    game.moveVertical();
    expect(game.activeTetromino.positions).toEqual([[2, 0], [2, 1], [2, 2], [3, 0]])
  });

  test("Updates the position of the l-block for player 2", () => {
    mockTetromino = { positions: [[1, 0], [1, 1], [1, 2], [2, 0]], value: 1 }
    game.activeTetromino = mockTetromino
    game.activePlayer = game.players[1];
    game.moveVertical();
    expect(game.activeTetromino.positions).toEqual([[0, 0], [0, 1], [0, 2], [1, 0]])
    expect(game.grid[2]).not.toContain(1)
  });

  test("Updates the position of the 0-block for player 1", () => {
    mockTetromino = { positions: [[1, 0], [1, 1], [2, 0], [2, 1]], value: 1 }
    game.activeTetromino = mockTetromino
    game.activePlayer = game.players[0]
    game.moveVertical();
    expect(game.activeTetromino.positions).toEqual([[2, 0], [2, 1], [3, 0], [3, 1]])
  });

  test("Updates the position of the 0-block for player 2", () => {
    mockTetromino = { positions: [[1, 0], [1, 1], [2, 0], [2, 1]], value: 1 }
    game.activeTetromino = mockTetromino
    game.activePlayer = game.players[1];
    game.moveVertical();
    expect(game.activeTetromino.positions).toEqual([[0, 0], [0, 1], [1, 0], [1, 1]])
  });

  test("Updates the position of the s-block for player 1", () => {
    mockTetromino = { positions: [[1, 1], [1, 2], [2, 0], [2, 1]], value: 1 }
    game.activeTetromino = mockTetromino
    game.activePlayer = game.players[0]
    game.moveVertical();
    expect(game.activeTetromino.positions).toEqual([[2, 1], [2, 2], [3, 0], [3, 1]])
  });

  test("Updates the position of the s-block for player 2", () => {
    mockTetromino = { positions: [[1, 1], [1, 2], [2, 0], [2, 1]], value: 1 }
    game.activeTetromino = mockTetromino
    game.activePlayer = game.players[1];
    game.moveVertical();
    expect(game.activeTetromino.positions).toEqual([[0, 1], [0, 2], [1, 0], [1, 1]])
  });

  test("Updates the position of the t-block for player 1", () => {
    mockTetromino = { positions: [[1, 1], [2, 0], [2, 1], [2, 2]], value: 1 }
    game.activeTetromino = mockTetromino
    game.activePlayer = game.players[0]
    game.moveVertical();
    expect(game.activeTetromino.positions).toEqual([[2, 1], [3, 0], [3, 1], [3, 2]])
  });

  test("Updates the position of the t-block for player 2", () => {
    mockTetromino = { positions: [[1, 1], [2, 0], [2, 1], [2, 2]], value: 1 }
    game.activeTetromino = mockTetromino
    game.activePlayer = game.players[1];
    game.moveVertical();
    expect(game.activeTetromino.positions).toEqual([[0, 1], [1, 0], [1, 1], [1, 2]])
  });

  test("Updates the position of the z-block for player 1", () => {
    mockTetromino = { positions: [[1, 0], [1, 1], [2, 1], [2, 2]], value: 1 }
    game.activeTetromino = mockTetromino
    game.activePlayer = game.players[0]
    game.moveVertical();
    expect(game.activeTetromino.positions).toEqual([[2, 0], [2, 1], [3, 1], [3, 2]])
  });

  test("Updates the position of the z-block for player 2", () => {
    mockTetromino = { positions: [[1, 0], [1, 1], [2, 1], [2, 2]], value: 1 }
    game.activeTetromino = mockTetromino
    game.activePlayer = game.players[1];
    game.moveVertical();
    expect(game.activeTetromino.positions).toEqual([[0, 0], [0, 1], [1, 1], [1, 2]])
  });

  test('Updates movement right I Block for player 1', () => {
    const random = 0
    game.activePlayer = game.players[0];
    game.generateTetromino(random)
    game.moveHorizontal("right")
    expect(game.activeTetromino.positions).toEqual([[10, 4], [10, 5], [10, 6], [10, 7]])
  })

  test("The game loop will generate a piece on each run of the loop", () => {
    const generateTetrominoSpy = jest.spyOn(Game.prototype, 'generateTetromino')
    game.playLoop(true);
    expect(generateTetrominoSpy).toHaveBeenCalled();
  });


});