const Tetromino = require("../src/tetromino");

describe("tetromino", () => {
  test("updates the position of the tetromino correctly", () => {
    const tetromino = new Tetromino();
    tetromino.position = [[0, 0], [0, 1], [0, 2], [0, 3]]

    tetromino.moveVertical('player1', tetromino);

    expect(tetromino.position).toEqual([[1, 0], [1, 1], [1, 2], [1, 3]]);
  });
});
