const Tetromino = require("../src/tetromino");

describe("tetromino", () => {
  test("Updates the position of the tetromino for Player 1", () => {
    const tetromino = new Tetromino();
    tetromino.position = [[0, 0], [0, 1], [0, 2], [0, 3]]
    tetromino.moveVertical('player1', tetromino);

    expect(tetromino.position).toEqual([[1, 0], [1, 1], [1, 2], [1, 3]]);
    console.log(tetromino.position)

  });
  test("Updates the position of player 2's tetromino", () => {
    const tetromino = new Tetromino();
    tetromino.position = [[1, 0], [1, 1], [1, 2], [1, 3]];
    tetromino.moveVertical('player2', tetromino);

    expect(tetromino.position).toEqual([[0, 0], [0, 1], [0, 2], [0, 3]]);
    console.log(tetromino.position)
  });

});
