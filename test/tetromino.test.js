const Tetromino = require('../src/tetromino');

describe('Tetromino', () => {
    it('checks for collision with wall for a single block moving down', () => {
        const tetromino = new Tetromino();
        tetromino.positions = [[0, 0]];

        expect(tetromino.checkCollisionDown([[1, 0]])).toBe(true);
        expect(tetromino.checkCollisionDown([[1, 0],[0, 0]])).toBe(false);
    });

    it('checks for collision with another piece for a single block moving down', () => {
        const tetromino = new Tetromino();
        tetromino.positions = [[0, 0]];

        expect(tetromino.checkCollisionDown([[1, 0], [2, 0]])).toBe(true);
        expect(tetromino.checkCollisionDown([[1, 0],[0, 0]])).toBe(false);
    })

    it('checks for collision with wall for a single block moving right', () => {
        const tetromino = new Tetromino();
        tetromino.positions = [[0, 0]];

        expect(tetromino.checkCollisionRight([[1]])).toBe(true);
        expect(tetromino.checkCollisionRight([[1, 0]])).toBe(false);
    })

    it('checks for collision with another piece for a single block moving right', () => {
        const tetromino = new Tetromino();
        tetromino.positions = [[0, 0]];

        expect(tetromino.checkCollisionRight([[1, 1], [0, 0]])).toBe(true);
        expect(tetromino.checkCollisionRight([[1, 0]])).toBe(false);
    })

    it('checks for collision with wall for a single block moving left', () => {
        const tetromino = new Tetromino();
        tetromino.positions = [[0, 0]];
        expect(tetromino.checkCollisionLeft([[1]])).toBe(true);
        tetromino.positions = [[0, 1]];
        expect(tetromino.checkCollisionLeft([[0, 1]])).toBe(false);
    })

    it('checks for collision with another piece for a single block moving left', () => {
        const tetromino = new Tetromino();
        tetromino.positions = [[0, 1]];

        expect(tetromino.checkCollisionLeft([[1, 1]])).toBe(true);
        expect(tetromino.checkCollisionLeft([[0, 1]])).toBe(false);
    })

    it('checks for collision with wall for a single block moving up', () => {
        const tetromino = new Tetromino();
        tetromino.positions = [[0, 0]];
        expect(tetromino.checkCollisionUp([[1]])).toBe(true);
        tetromino.positions = [[1, 0]];
        expect(tetromino.checkCollisionUp([[0], [1]])).toBe(false);
    })

    it('checks for collision with another piece for a single block moving up', () => {
        const tetromino = new Tetromino();
        tetromino.positions = [[1, 0]];

        expect(tetromino.checkCollisionUp([[1, 1]])).toBe(true);
        expect(tetromino.checkCollisionUp([[0, 1]])).toBe(false);
    })
});