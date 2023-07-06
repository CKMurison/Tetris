const Tetromino = require("../src/tetromino");
const Game = require("../src/game");

let game, mockTetromino;

describe("tetromino", () => {
  beforeEach(() => {
    game = new Game()
  })

  test("Updates the position of the I-Block for Player 1", () => {
    mockTetromino = { position: [[2, 0], [2, 1], [2, 2], [2, 3]], value: 1 }
    game.activeTetromino = mockTetromino;
    game.activePlayer = 'player1'
    game.moveVertical();
    expect(game.activeTetromino.position).toEqual([[3, 0], [3, 1], [3, 2], [3, 3]]);
    expect(game.grid[2]).not.toContain(1)
    console.log(game.grid)
  });
  
  test("Updates the position of the I-block for player 2", () => {
    mockTetromino = { position:[[2, 0], [2, 1], [2, 2], [2, 3]], value: 1 }
    game.activeTetromino = mockTetromino
    game.activePlayer = 'player2'
    game.moveVertical();
    expect(game.activeTetromino.position).toEqual([[1, 0], [1, 1], [1, 2], [1, 3]])
  });
  
  test("Updates the position of the J-block for player 1", () => {
    mockTetromino = { position:[[1, 0], [2, 0], [2, 1], [2, 2]], value: 1 }
    game.activeTetromino = mockTetromino
    game.activePlayer = 'player1'
    game.moveVertical();
    expect(game.activeTetromino.position).toEqual([[2, 0], [3, 0], [3, 1], [3, 2]])
  });

  test("Updates the position of the J-block for player 2", () => {
    mockTetromino = { position:[[1, 0], [2, 0], [2, 1], [2, 2]], value: 1 }
    game.activeTetromino = mockTetromino
    game.activePlayer = 'player2'
    game.moveVertical();
    expect(game.activeTetromino.position).toEqual([[0, 0], [1, 0], [1, 1], [1, 2]])
  });

  test("Updates the position of the l-block for player 1", () => {
    mockTetromino = { position:[[1, 0], [1, 1], [1, 2], [2, 0]], value: 1 }
    game.activeTetromino = mockTetromino
    game.activePlayer = 'player1'
    game.moveVertical();
    expect(game.activeTetromino.position).toEqual([[2, 0], [2, 1], [2, 2], [3, 0]])
  });
  
  test("Updates the position of the l-block for player 2", () => {
    mockTetromino = { position:[[1, 0], [1, 1], [1, 2], [2, 0]], value: 1 }
    game.activeTetromino = mockTetromino
    game.activePlayer = 'player2'
    game.moveVertical();
    expect(game.activeTetromino.position).toEqual([[0, 0], [0, 1], [0, 2], [1, 0]])
  });
  
  test("Updates the position of the 0-block for player 1", () => {
    mockTetromino = { position:[[1, 0], [1, 1], [2, 0], [2, 1]], value: 1 }
    game.activeTetromino = mockTetromino
    game.activePlayer = 'player1'
    game.moveVertical();
    expect(game.activeTetromino.position).toEqual([[2, 0], [2, 1], [3, 0], [3, 1]])
  });
  
  test("Updates the position of the 0-block for player 2", () => {
    mockTetromino = { position:[[1, 0], [1, 1], [2, 0], [2, 1]], value: 1 }
    game.activeTetromino = mockTetromino
    game.activePlayer = 'player2'
    game.moveVertical();
    expect(game.activeTetromino.position).toEqual([[0, 0], [0, 1], [1, 0], [1, 1]])
  });
  
  test("Updates the position of the s-block for player 1", () => {
    mockTetromino = { position:[[1, 1], [1, 2], [2, 0], [2, 1]], value: 1 }
    game.activeTetromino = mockTetromino
    game.activePlayer = 'player1'
    game.moveVertical();
    expect(game.activeTetromino.position).toEqual([[2, 1], [2, 2], [3, 0], [3, 1]])
  });
  
  test("Updates the position of the s-block for player 2", () => {
    mockTetromino = { position:[[1, 1], [1, 2], [2, 0], [2, 1]], value: 1 }
    game.activeTetromino = mockTetromino
    game.activePlayer = 'player2'
    game.moveVertical();
    expect(game.activeTetromino.position).toEqual([[0, 1], [0, 2], [1, 0], [1, 1]])
  });
  
  test("Updates the position of the t-block for player 1", () => {
    mockTetromino = { position:[[1, 1], [2, 0], [2, 1], [2, 2]], value: 1 }
    game.activeTetromino = mockTetromino
    game.activePlayer = 'player1'
    game.moveVertical();
    expect(game.activeTetromino.position).toEqual([[2, 1], [3, 0], [3, 1], [3, 2]])
  });
  
  test("Updates the position of the t-block for player 2", () => {
    mockTetromino = { position:[[1, 1], [2, 0], [2, 1], [2, 2]], value: 1 }
    game.activeTetromino = mockTetromino
    game.activePlayer = 'player2'
    game.moveVertical();
    expect(game.activeTetromino.position).toEqual([[0, 1], [1, 0], [1, 1], [1, 2]])
  });
  
  test("Updates the position of the z-block for player 1", () => {
  mockTetromino = { position:[[1, 0], [1, 1], [2, 1], [2, 2]], value: 1 }
  game.activeTetromino = mockTetromino
  game.activePlayer = 'player1'
  game.moveVertical();
  expect(game.activeTetromino.position).toEqual([[2, 0], [2, 1], [3, 1], [3, 2]])
  });
 
  test("Updates the position of the z-block for player 2", () => {
  mockTetromino = { position:[[1, 0], [1, 1], [2, 1], [2, 2]], value: 1 }
  game.activeTetromino = mockTetromino
  game.activePlayer = 'player2'
  game.moveVertical();
  expect(game.activeTetromino.position).toEqual([[0, 0], [0, 1], [1, 1], [1, 2]])
  });
}); 