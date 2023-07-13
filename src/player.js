const powerUps = require('./powerUps.js')

class Player {
    constructor(player, game) {
        this.activePlayer = player;
        this.timer = 600;
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

    incrementLineCounter() {
        this.linesCleared++;
        if(this.linesCleared % 1 === 0) {
            this.powerUps[this.nextPowerUp](this.game)
            this.nextPowerUp = (this.nextPowerUp+1) % this.powerUps.length
        }
        document.querySelector(`#linesClearedP${this.activePlayer}`).textContent = this.linesCleared;
        document.querySelector(`#nextPowerUpP${this.activePlayer}`).textContent = this.nextPowerUpNames[this.nextPowerUp];
    }

    controls() {
        if (this.activePlayer === 1) {
            document.removeEventListener('keydown', this.player1Movement);
            document.addEventListener('keydown', this.player1Movement)
        } else {
            document.removeEventListener('keydown', this.player2Movement);
            document.addEventListener('keydown', this.player2Movement)
        }

        document.removeEventListener('keyup', this.commonControls);
        document.addEventListener('keyup', this.commonControls);
    };

    player1Movement = (e) => {    
        if (this.game.activePlayer === this.game.players[0]) {
            if (e.key === 'ArrowLeft') {
                this.game.moveHorizontal('left');
            } else if (e.key === "ArrowRight") {
                this.game.moveHorizontal('right');
            } else if (e.key === "ArrowUp") {
                this.game.rotateTetromino();
            } else if (e.key === "ArrowDown") {
              if (!this.game.activeTetromino.checkCollisionDown(this.game.grid)) {
                this.game.moveVertical();
                this.game.render.drawGrid(this.game.grid);
              }
            }
        }   
    }

    player2Movement = (e) => {
        if (this.game.activePlayer === this.game.players[1]) {
            if (e.key === "a") {
                this.game.moveHorizontal('left');
            } else if (e.key === "d") {
                this.game.moveHorizontal('right');
            } else if (e.key === "s") {
                this.game.rotateTetromino();
            } else if (e.key === "w") {
                if (!this.game.activeTetromino.checkCollisionUp(this.game.grid)) {
                  this.game.moveVertical();
                  this.game.render.drawGrid(this.game.grid);
                }
            }
        }
    }

    commonControls = (e) => {
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
            }
        } else if (e.key == " ") {
            this.game.pauseGame();
        }
    }

    clearEventListeners() {
        document.removeEventListener('keydown', this.player1Movement);
        document.removeEventListener('keydown', this.player2Movement);
        document.removeEventListener('keydown', this.commonControls);
    }
}

module.exports = Player;

// Add stop gap so button is only active when the right player is interacting with the right controls (run if player = 1)
