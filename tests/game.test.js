const Game = require("../src/game");

let game, mockTetromino;

describe("Game", () => {
  beforeEach(() => {
    game = new Game()
  });

  describe('move vertical', () => {
    test("Updates the position of the I-Block for Player 1", () => {
      mockTetromino = { positions: [[2, 0], [2, 1], [2, 2], [2, 3]], value: 1 }
      game.activeTetromino = mockTetromino;
      game.activePlayer = 'player1'
      game.moveVertical();
      expect(game.activeTetromino.positions).toEqual([[3, 0], [3, 1], [3, 2], [3, 3]]);
      expect(game.grid[2]).not.toContain(1)
    });
    
    test("Updates the position of the I-block for player 2", () => {
      mockTetromino = { positions:[[2, 0], [2, 1], [2, 2], [2, 3]], value: 1 }
      game.activeTetromino = mockTetromino
      game.activePlayer = 'player2'
      game.moveVertical();
      expect(game.activeTetromino.positions).toEqual([[1, 0], [1, 1], [1, 2], [1, 3]])
    });
    
    test("Updates the position of the J-block for player 1", () => {
      mockTetromino = { positions:[[1, 0], [2, 0], [2, 1], [2, 2]], value: 1 }
      game.activeTetromino = mockTetromino
      game.activePlayer = 'player1'
      game.moveVertical();
      expect(game.activeTetromino.positions).toEqual([[2, 0], [3, 0], [3, 1], [3, 2]])
      expect(game.grid[1]).not.toContain(1)
    });

    test("Updates the position of the J-block for player 2", () => {
      mockTetromino = { positions:[[1, 0], [2, 0], [2, 1], [2, 2]], value: 1 }
      game.activeTetromino = mockTetromino
      game.activePlayer = 'player2'
      game.moveVertical();
      expect(game.activeTetromino.positions).toEqual([[0, 0], [1, 0], [1, 1], [1, 2]])
    });

    test("Updates the position of the l-block for player 1", () => {
      mockTetromino = { positions:[[1, 0], [1, 1], [1, 2], [2, 0]], value: 1 }
      game.activeTetromino = mockTetromino
      game.activePlayer = 'player1'
      game.moveVertical();
      expect(game.activeTetromino.positions).toEqual([[2, 0], [2, 1], [2, 2], [3, 0]])
    });
    
    test("Updates the position of the l-block for player 2", () => {
      mockTetromino = { positions:[[1, 0], [1, 1], [1, 2], [2, 0]], value: 1 }
      game.activeTetromino = mockTetromino
      game.activePlayer = 'player2'
      game.moveVertical();
      expect(game.activeTetromino.positions).toEqual([[0, 0], [0, 1], [0, 2], [1, 0]])
      expect(game.grid[2]).not.toContain(1)
    });
  
    test("Updates the position of the 0-block for player 1", () => {
      mockTetromino = { positions:[[1, 0], [1, 1], [2, 0], [2, 1]], value: 1 }
      game.activeTetromino = mockTetromino
      game.activePlayer = 'player1'
      game.moveVertical();
      expect(game.activeTetromino.positions).toEqual([[2, 0], [2, 1], [3, 0], [3, 1]])
    });
    
    test("Updates the position of the 0-block for player 2", () => {
      mockTetromino = { positions:[[1, 0], [1, 1], [2, 0], [2, 1]], value: 1 }
      game.activeTetromino = mockTetromino
      game.activePlayer = 'player2'
      game.moveVertical();
      expect(game.activeTetromino.positions).toEqual([[0, 0], [0, 1], [1, 0], [1, 1]])
    });
    
    test("Updates the position of the s-block for player 1", () => {
      mockTetromino = { positions:[[1, 1], [1, 2], [2, 0], [2, 1]], value: 1 }
      game.activeTetromino = mockTetromino
      game.activePlayer = 'player1'
      game.moveVertical();
      expect(game.activeTetromino.positions).toEqual([[2, 1], [2, 2], [3, 0], [3, 1]])
    });
    
    test("Updates the position of the s-block for player 2", () => {
      mockTetromino = { positions:[[1, 1], [1, 2], [2, 0], [2, 1]], value: 1 }
      game.activeTetromino = mockTetromino
      game.activePlayer = 'player2'
      game.moveVertical();
      expect(game.activeTetromino.positions).toEqual([[0, 1], [0, 2], [1, 0], [1, 1]])
    });
    
    test("Updates the position of the t-block for player 1", () => {
      mockTetromino = { positions:[[1, 1], [2, 0], [2, 1], [2, 2]], value: 1 }
      game.activeTetromino = mockTetromino
      game.activePlayer = 'player1'
      game.moveVertical();
      expect(game.activeTetromino.positions).toEqual([[2, 1], [3, 0], [3, 1], [3, 2]])
    });
    
    test("Updates the position of the t-block for player 2", () => {
      mockTetromino = { positions:[[1, 1], [2, 0], [2, 1], [2, 2]], value: 1 }
      game.activeTetromino = mockTetromino
      game.activePlayer = 'player2'
      game.moveVertical();
      expect(game.activeTetromino.positions).toEqual([[0, 1], [1, 0], [1, 1], [1, 2]])
    });
    
    test("Updates the position of the z-block for player 1", () => {
      mockTetromino = { positions:[[1, 0], [1, 1], [2, 1], [2, 2]], value: 1 }
      game.activeTetromino = mockTetromino
      game.activePlayer = 'player1'
      game.moveVertical();
      expect(game.activeTetromino.positions).toEqual([[2, 0], [2, 1], [3, 1], [3, 2]])
    });
  
    test("Updates the position of the z-block for player 2", () => {
      mockTetromino = { positions:[[1, 0], [1, 1], [2, 1], [2, 2]], value: 1 }
      game.activeTetromino = mockTetromino
      game.activePlayer = 'player2'
      game.moveVertical();
      expect(game.activeTetromino.positions).toEqual([[0, 0], [0, 1], [1, 1], [1, 2]])
    });
  });
}); 