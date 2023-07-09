const Test = require('../src/test')

describe('Test',()=> {
    it('rotates the j piece 90 degrees clockwise', () => {
        const test = new Test()
        
        expect(test.rotatePiece()).toEqual([])
    })
})