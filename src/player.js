const powerUps = require('./powerUps.js')

class Player{
    constructor(player, game) {
        this.activePlayer = player;
        this.timer = 60;
        this.game = game;
        this.linesCleared = 0;
        this.nextPowerUp = 0;
        this.powerUps = [powerUps.speedUp, powerUps.bizarre, powerUps.removeRandomBlock]
        this.nextPowerUpNames = {
            0: 'Opponent Speed Up',
            1: 'Bizarre Tetromino',
            2: 'Remove A Block'
        }
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

        // ArrowDown speed up the drop of the tetromino after checking for collision
        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowDown") {
              let collided =
                this.game.activePlayer === this.game.players[0] ? this.game.activeTetromino.checkCollisionDown(this.game.grid) : this.game.activeTetromino.checkCollisionUp(this.game.grid);
              if (!collided) {
                this.game.moveVertical();
                this.game.render.drawGrid(this.game.grid);
              }
            }
          });

        document.addEventListener('keyup', (e) => {
            if (e.key == " ") {
                this.game.pauseGame();
            }
        })

        document.addEventListener('keyup', (e) => {
            if (e.key == "r") {
                if (this.game.gameOver) {
                    this.game.gameOver = false;
                    this.game.render.removeOverlayText();
                    this.game.restartGame();
                    this.game.playLoop();
                } else {
                    this.game.newGame = true;
                    this.game.isPaused = false;
                    this.game.render.restartText();
                    console.log('buttonPressed');
                }
            }
        })
        

    };   

    incrementLineCounter() {
        this.linesCleared++;
        if(this.linesCleared % 1 === 0) {
            this.powerUps[this.nextPowerUp](this.game)
            this.nextPowerUp = (this.nextPowerUp+1) % this.powerUps.length
        }
        document.querySelector(`#linesClearedP${this.activePlayer}`).textContent = this.linesCleared;
        document.querySelector(`#nextPowerUpP${this.activePlayer}`).textContent = this.nextPowerUpNames[this.nextPowerUp];
    }
};

module.exports = Player;

// Add stop gap so button is only active when the right player is interacting with the right controls (run if player = 1)
