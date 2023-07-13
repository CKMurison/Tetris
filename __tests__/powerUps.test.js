const powerUps = require('../src/powerUps.js')

describe('PowerUps.speedUp', () => {
    it('speeds up game for opponent', () => {
        const mockGame = {
            players : [{timer : 100}, {timer : 100}]
        }
        mockGame.activePlayer = mockGame.players[0]
    
        powerUps.speedUp(mockGame)
        expect(mockGame.players[1].timer).toBe(80)
    })
})

describe('PowerUps.bizarre', () => {
    it('generates bizarre block for opponent', () => {
        const mockGame = {
            bizarre : false
        }
        powerUps.bizarre(mockGame)
        expect(mockGame.bizarre).toBe(true)
    })
})

describe('PowerUps.clearRandomBlock', () => {
    it('clears random block from opponents side (p1 perspective)', () => {
        const mockGame = {
            grid : [[2,1],[2,0]],
            players : [1,2],
            midRow : 0
        }
        mockGame.activePlayer = mockGame.players[0]

        powerUps.removeRandomBlock(mockGame)

        expect(mockGame.grid[0]).not.toEqual([2,1])
        expect(mockGame.grid[1]).toEqual([2,0])
    })
})