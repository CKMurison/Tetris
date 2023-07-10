const Game = require("../src/game");

let game, mockTetromino;

describe("Game", () => {
  beforeEach(() => {
    let render = { drawGrid: () => { } }
    game = new Game(render)
  });

  test('it correctly assigns an active player', () => {
    game.playLoop(test);
    expect(game.activePlayer).not.toEqual(null)
  })

  describe('move vertical', () => {
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
  });

  describe('game loop', () => {
    test('initially Player1 is the active player', () => {
      expect(game.activePlayer).toEqual(game.players[0]);
    })

    test('after running the loop the player swaps to Player2', () => {
      const swapPlayerSpy = jest.spyOn(Game.prototype, 'swapPlayer');
      game.playLoop(true);
      expect(swapPlayerSpy).toHaveBeenCalled();
      expect(game.activePlayer).toEqual(game.players[1]);
    })

    test("The game loop will generate a piece on each run of the loop", () => {
      const generateTetrominoSpy = jest.spyOn(Game.prototype, 'generateTetromino')
      game.playLoop(true);
      expect(generateTetrominoSpy).toHaveBeenCalled();
    });

    xtest("The piece will move until no longer legal", () => {
      game.playLoop(true);
      mockTetromino = {
        checkCollisionDown: jest.fn(),
        checkCollisionUp: jest.fn(),
      };

      const checkCollisionDownSpy = jest.spyOn(Game.activeTetromino, 'checkCollisionDown')
      expect(checkCollisionDownSpy).toHaveBeenCalled();
    })



    xtest("The piece will move until no longer legal", () => {
      game.playLoop(true);

      const checkCollisionUpSpy = jest.spyOn(Game.activeTetromino, 'checkCollisionUp')
      expect(checkCollisionUpSpy).toHaveBeenCalledTimes(0);
    })
  });
});
