const Tetromino = require("../src/tetromino");
const Game = require("../src/game");

let game, mockTetromino;

describe("tetromino", () => {
  beforeEach(() => {
    game = new Game()
  })

  test("Updates the position of the I-Block for Player 1", () => {
    mockTetromino = { position: [[2, 0], [2, 1], [2, 2], [2, 3]] }
    game.activeTetromino = mockTetromino;
    game.activePlayer = 'player1'
    game.moveVertical();
    expect(game.activeTetromino.position).toEqual([[3, 0], [3, 1], [3, 2], [3, 3]]);
  });

  test("Updates the position of the I-block for player 2", () => {
    mockTetromino = { position:[[2, 0], [2, 1], [2, 2], [2, 3]] }
    game.activeTetromino = mockTetromino
    game.activePlayer = 'player2'
    game.moveVertical();
    expect(game.activeTetromino.position).toEqual([[1, 0], [1, 1], [1, 2], [1, 3]])
  });
  test("Updates the position of the J-block for player 1", () => {
    mockTetromino = { position:[[1, 0], [2, 0], [2, 1], [2, 2]] }
    game.activeTetromino = mockTetromino
    game.activePlayer = 'player1'
    game.moveVertical();
    expect(game.activeTetromino.position).toEqual([[2, 0], [3, 0], [3, 1], [3, 2]])
  });
  test("Updates the position of the J-block for player 2", () => {
    mockTetromino = { position:[[1, 0], [2, 0], [2, 1], [2, 2]] }
    game.activeTetromino = mockTetromino
    game.activePlayer = 'player2'
    game.moveVertical();
    expect(game.activeTetromino.position).toEqual([[0, 0], [1, 0], [1, 1], [1, 2]])
  });
});