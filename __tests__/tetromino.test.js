const Tetromino = require('../src/tetromino');

let tetromino;

describe('Tetromino', () => {
    beforeEach(() => {
        tetromino = new Tetromino();
    })


    it('checks for collision with wall for a single block moving down', () => {
        tetromino.positions = [[0, 0]];

        expect(tetromino.checkCollisionDown([[1, 0]])).toBe(true);
        expect(tetromino.checkCollisionDown([[1, 0],[0, 0]])).toBe(false);
    });

    it('checks for collision with another piece for a single block moving down', () => {
        tetromino.positions = [[0, 0]];

        expect(tetromino.checkCollisionDown([[1, 0], [2, 0]])).toBe(true);
        expect(tetromino.checkCollisionDown([[1, 0],[0, 0]])).toBe(false);
    })

    it('checks for collision with wall for a single block moving right', () => {
        tetromino.positions = [[0, 0]];

        expect(tetromino.checkCollisionRight([[1]])).toBe(true);
        expect(tetromino.checkCollisionRight([[1, 0]])).toBe(false);
    })

    it('checks for collision with another piece for a single block moving right', () => {
        tetromino.positions = [[0, 0]];

        expect(tetromino.checkCollisionRight([[1, 1], [0, 0]])).toBe(true);
        expect(tetromino.checkCollisionRight([[1, 0]])).toBe(false);
    })

    it('checks for collision with wall for a single block moving left', () => {
        tetromino.positions = [[0, 0]];
        expect(tetromino.checkCollisionLeft([[1]])).toBe(true);
        tetromino.positions = [[0, 1]];
        expect(tetromino.checkCollisionLeft([[0, 1]])).toBe(false);
    })

    it('checks for collision with another piece for a single block moving left', () => {
        tetromino.positions = [[0, 1]];

        expect(tetromino.checkCollisionLeft([[1, 1]])).toBe(true);
        expect(tetromino.checkCollisionLeft([[0, 1]])).toBe(false);
    })

    it('checks for collision with wall for a single block moving up', () => {
        tetromino.positions = [[0, 0]];
        expect(tetromino.checkCollisionUp([[1]])).toBe(true);
        tetromino.positions = [[1, 0]];
        expect(tetromino.checkCollisionUp([[0], [1]])).toBe(false);
    })

    it('checks for collision with another piece for a single block moving up', () => {
        tetromino.positions = [[1, 0]];

        expect(tetromino.checkCollisionUp([[1, 1]])).toBe(true);
        expect(tetromino.checkCollisionUp([[0, 1]])).toBe(false);
    })

    it('ignores irrelevant pieces when moving down', () => {
        tetromino.positions = [[0, 0], [0, 1], [1, 1], [1, 2]];
        let grid = [[1, 1, 0], [0, 1, 1], [0, 0, 0]];

        expect(tetromino.checkCollisionDown(grid)).toBe(false);
    })

    it('ignores irrelevant pieces when moving up', () => {
        tetromino.positions = [[1, 0], [1, 1], [2, 1], [2, 2]];
        let grid = [[0, 0, 0], [1, 1, 0], [0, 1, 1]];

        expect(tetromino.checkCollisionUp(grid)).toBe(false);
    })

    it('ignores irrelevant pieces when moving right', () => {
        tetromino.positions = [[0, 1], [0, 2], [1, 2], [1, 3]];
        let grid = [[0, 1, 1, 0, 0], [0, 0, 1, 1, 0]];

        expect(tetromino.checkCollisionLeft(grid)).toBe(false);
    })

    it('ignores irrelevant pieces when moving left', () => {
        tetromino.positions = [[0, 1], [0, 2], [1, 2], [1, 3]];
        let grid = [[0, 1, 1, 0], [0, 0, 1, 1]];

        expect(tetromino.checkCollisionLeft(grid)).toBe(false);
    })
});