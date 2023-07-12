const powerUps = require('./powerUps.js')

class Player{
    constructor(player, game) {
        this.activePlayer = player;
        this.timer = 600;
        this.game = game;
        this.linesCleared = 0;
        this.nextPowerUp = 0;
        this.powerUps = [powerUps.speedUp, powerUps.bizarre, powerUps.removeRandomBlock]
        
        this.controls();
    }

    controls() {
        document.addEventListener('keydown', (e) => {    
            if (this.activePlayer === 1) {
                if (e.key === 'ArrowLeft') {
                    this.game.moveHorizontal('left');
                } else if (e.key === "ArrowRight") {
                    this.game.moveHorizontal('right');
                } else if (e.key === "ArrowUp") {
                    this.game.rotateTetromino();
                }
            } else {
                if (e.key === "a") {
                    this.game.moveHorizontal('left');
                } else if (e.key === "d") {
                    this.game.moveHorizontal('right');
                } else if (e.key === "s") {
                    this.game.rotateTetromino();
                }
            }    
        }); 

        document.addEventListener('keyup', (e) => {
            if (e.key == " " && this.activePlayer === 1) {
                this.game.pauseGame();
            }
        })
    };

    incrementLineCounter() {
        this.linesCleared++;
        if(this.linesCleared % 1 === 0) {
            this.powerUps[this.nextPowerUp](this.game)
            this.nextPowerUp = (this.nextPowerUp+1) % this.powerUps.length
        }
    }
};

module.exports = Player;

// Add stop gap so button is only active when the right player is interacting with the right controls (run if player = 1)