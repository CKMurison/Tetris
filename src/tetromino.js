class Tetromino {
  moveVertical(player, tetromino) {
    tetromino.position.forEach((blockPosition) => {
      if (player === 'player1') {
        blockPosition[0] += 1;
      } else {
        blockPosition[0] -= 1;
      };
    });
  }
}

module.exports = Tetromino;

