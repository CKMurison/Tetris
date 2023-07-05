const Player = require('./player');

class Game {
  constructor() {
    this.grid = Array.from({ length: 20 }, () => Array(10).fill(0));; //first number = rows, second number = columns
    this.activeTetromino = null;
    this.shape = [
      // I-Block
      [1, 1, 1, 1],
      // J-Block
      [[2, 0, 0], [2, 2, 2]],
      // L-Block
      [[0, 0, 3], [3, 3, 3]],
      //  O-Block
      [[4, 4], [4, 4]],
      // S-Block
      [[0, 5, 5], [5, 5, 0]],
      // T-Block
      [[0, 6, 0], [6, 6, 6]],
      // Z-Block
      [[7, 7, 0], [0, 7, 7]],
    ]
    this.position = {
      i: {
        p1: [[10, 3], [10, 4], [10, 5], [10, 6]],
        p2: [[9, 3], [9, 4], [9, 5], [9, 6]]
      },
      j: [[9, 3], [10, 3], [10, 4], [10, 5]],
      l: [[9, 5], [10, 3], [10, 4], [10, 5]],
      o: [[9, 4], [9, 5], [10, 4], [10, 5]],
      s: [[9, 4], [9, 5], [10, 3], [10, 4]],
      t: [[9, 4], [10, 3], [10, 4], [10, 5]],
      z: [[9, 3], [9, 4], [10, 4], [10, 5]]
    }
    const players = [new Player(), new Player()]
  };

  generateTetromino() {
    this.randomIndex = Math.floor(Math.random() * 7)
    let key = null

    switch (3) {
      case 0:
        if (true) {
          game.position.i.p1.forEach(arr =>
            this.grid[arr[0]][arr[1]] = this.randomIndex + 1
          )
        } else { // Needs to interact with current player
          game.position.i.p2.forEach(arr =>
            this.grid[arr[0]][arr[1]] = this.randomIndex + 1
          )
        }
      case 1:
        key = "j"
        this.spawnNonIBlock(key)
      case 2:
        key = "l"
        this.spawnNonIBlock(key)
      case 3:
        key = "o"
        this.spawnNonIBlock(key)
      case 4:
        key = "s"
        this.spawnNonIBlock(key)
      case 5:
        key = "t"
        this.spawnNonIBlock(key)
      case 6:
        key = "z"
        this.spawnNonIBlock(key)
    }

    this.activeTetromino = this.shape[this.randomIndex]
    return this.activeTetromino;
  }

  private

  spawnNonIBlock(key) {
    game.position[key].forEach(arr =>
      this.grid[arr[0]][arr[1]] = 3
    )
  }
};

const game = new Game();
game.generateTetromino()
console.log(game.grid)

// game.position.i.p1.forEach(arr => 
//   console.log(arr[0] + "<- row\n" + arr[1] + "<- column\n")
//   )

// game.position.i.p1.forEach(arr => 
//   this.grid[arr[0]][arr[1]] = randomIndex + 1
//   )

//this.shape ==> position 
