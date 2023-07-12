const powerUps = {
    speedUp : (game) => {
        let opponent = game.activePlayer === game.players[0] ? game.players[1] : game.players[0]
        opponent.timer -= 20
    },

    bizarre : (game) => {
        game.bizarre = true;
    },

    removeRandomBlock : (game) => {
        let start, end;
        let pos = [];
        if (game.activePlayer === game.players[1]) {
            start = game.midRow + 1;
            end = game.grid.length - 1;
        } else {
            start = 0;
            end = game.midRow;
        }
        for(let i = start; i <= end; i++) {
            game.grid[i].forEach((cell,index) => {
                if(cell !== 0) {pos.push([i,index])}
            })
        }
        let rand = Math.floor(Math.random() * pos.length)
        game.grid[pos[rand][0]][pos[rand][1]] = 0
    }
}

module.exports = powerUps;