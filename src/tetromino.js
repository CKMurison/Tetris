class Tetromino {
  moveVertical(player, tetromino) {
    tetromino.position.forEach((blockPosition) => {
      blockPosition[0] += 1;
    });
  }
}

module.exports = Tetromino;
