/**
 * @jest-environment jsdom
 */

const Render = require('../src/render')
const fs = require('fs');

describe('Render class', () => {
    beforeEach(() => {
        document.body.innerHTML = fs.readFileSync('./index.html');
    });

    it('creates the correct div blocks', () => {
        const render = new Render();
        render.drawGrid([[0, 0], [0, 1]]);
        const emptyBlocks = document.querySelectorAll('.empty');
        const iBlocks = document.querySelectorAll('.iBlock');

        expect(emptyBlocks.length).toBe(3);
        expect(iBlocks.length).toBe(1);
    });
});