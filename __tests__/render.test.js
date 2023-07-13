/**
 * @jest-environment jsdom
 */

const Render = require('../src/render')
const fs = require('fs');

let render;

describe('Render class', () => {
    beforeEach(() => {
        document.body.innerHTML = fs.readFileSync('./index.html');
        render = new Render();
    });

    it('creates the correct div blocks', () => {
        render.drawGrid([[0, 0], [0, 1]]);
        const emptyBlocks = document.querySelectorAll('.empty');
        const iBlocks = document.querySelectorAll('.iBlock');

        expect(emptyBlocks.length).toBe(3);
        expect(iBlocks.length).toBe(1);
    });

    it('assigns correct class to block', () => {
        render.drawGrid([[1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 0, 0, 0, 0, 0, 0, 0, 0]])
        
        expect(document.querySelectorAll('.jBlock').length).toBe(1);
        expect(document.querySelectorAll('.lBlock').length).toBe(1);
        expect(document.querySelectorAll('.oBlock').length).toBe(1);
        expect(document.querySelectorAll('.sBlock').length).toBe(1);
        expect(document.querySelectorAll('.tBlock').length).toBe(1);
        expect(document.querySelectorAll('.zBlock').length).toBe(1);
        expect(document.querySelectorAll('.plusBlock').length).toBe(1);
        expect(document.querySelectorAll('.uBlock').length).toBe(1);
    })

    it('correctly finds a spawn line', () => {
        render.drawGrid([[0], [0]])
        render.findSpawnLine([[0], [0]]);
        expect(document.querySelector('.spawnRow').id).toBe("row0");
        render.drawGrid([[0], [0], [0], [0]]);
        render.findSpawnLine([[0], [0], [0], [0]]);
        expect(document.querySelector('.spawnRow').id).toBe("row1");
    })

    it('shows the correct active player', () => {
        render.displayActivePlayer('player1');
        expect(document.querySelector('#activePlayer').textContent).toBe('player1');
    })

    test("pauseText correctly displays text on overlay", () => {
        render.pauseText();
        expect(document.querySelector('.overlay').textContent).toBe('game pausedpress r to restart')
    });

    test("restartText correctly displays text on overlay", () => {
        render.restartText();
        expect(document.querySelector('.overlay').textContent).toBe('Restarting game')
    });
});