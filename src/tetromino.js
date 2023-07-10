class Tetromino {
    constructor(positions, value) {
        this.positions = positions;
        this.value = value;
    }

    checkCollisionDown(grid) {
        let collision = false;
        this.positions.forEach((position) => {
            const filter = this.positions.filter(e => e[0] === position[0] + 1 && e[1] === position[1]);
            if (filter.length === 1) return; 
            if (position[0] >= grid.length - 1) {
                collision = true;
            } else if (grid[position[0] + 1][position[1]] !== 0) {
                collision = true;
            }
        })
        return collision;
    }

    checkCollisionUp(grid) {
        let collision = false;
        this.positions.forEach((position) => {
            const filter = this.positions.filter(e => e[0] === position[0] - 1 && e[1] === position[1]);
            if (filter.length === 1) return;
            if (position[0] === 0) {
                collision = true;
            } else if (grid[position[0] - 1][position[1]] !== 0) {
                collision = true;
            }
        })
        return collision;
    }

    checkCollisionRight(grid) {
        let collision = false;
        this.positions.forEach((position) => {
            const filter = this.positions.filter(e => e[0] === position[0] && e[1] === position[1] + 1);
            if (filter.length === 1) return;
            if (position[1] >= grid[0].length - 1) {
                collision = true;
            } else if (grid[position[0]][position[1] + 1] !== 0) {
                collision = true;
            }
        })
        return collision;
    }

    checkCollisionLeft(grid) {
        let collision = false;
        this.positions.forEach((position) => {
            const filter = this.positions.filter(e => e[0] === position[0] && e[1] === position[1] - 1);
            if (filter.length === 1) return;
            if (position[1] === 0) {
                collision = true;
            } else if (grid[position[0]][position[1] - 1] !== 0) {
                collision = true;
            }
        })
        return collision;
    }
}

module.exports = Tetromino;
