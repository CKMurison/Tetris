class Player{
    constructor(player, game) {
        this.activePlayer = player;
        this.game = game;
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
            if (e.key == " " && this.activePlayer === 1) {
                this.game.pauseGame();
            }
        })
    };   
};

module.exports = Player;

// Add stop gap so button is only active when the right player is interacting with the right controls (run if player = 1)
