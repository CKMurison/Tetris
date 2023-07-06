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

    it('assigns correct class to block', () => {
        const render = new Render();
        render.drawGrid([[1, 2, 3, 4, 5, 6, 7]])
        
        expect(document.querySelectorAll('.jBlock').length).toBe(1);
        expect(document.querySelectorAll('.lBlock').length).toBe(1);
        expect(document.querySelectorAll('.oBlock').length).toBe(1);
        expect(document.querySelectorAll('.sBlock').length).toBe(1);
        expect(document.querySelectorAll('.tBlock').length).toBe(1);
        expect(document.querySelectorAll('.zBlock').length).toBe(1);
    })
});