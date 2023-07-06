class Tetromino {
    constructor() {
        this.positions = null;
    }

    checkCollisionDown(grid) {
        let collision = false;
        this.positions.forEach((position) => {
            if (position[0] >= grid.length - 1) {
                collision = true;
            } else if (grid[position[0] + 1][position[1]] !== 0) {
                collision = true;
            }
        })
        return collision;
    }

    checkCollisionRight(grid) {
        let collision = false;
        this.positions.forEach((position) => {
            if (position[0] >= grid[0].length - 1) {
                collision = true;
            } else if (grid[position[0]][position[1] + 1] !== 0) {
                collision = true;
            }
        })
        return collision;
    }
}

module.exports = Tetromino;