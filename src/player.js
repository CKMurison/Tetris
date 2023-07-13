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

        document.addEventListener('keyup', (e) => {
            if (e.key == " " && this.activePlayer === 1) {
                this.game.pauseGame();
            }
        })

        document.addEventListener('keyup', (e) => {
            if (e.key == "r" && this.activePlayer === 1) {
                this.game.newGame = true;
                this.game.render.restartText();
                console.log('buttonPressed');
            }
        })
        

    };   
};

module.exports = Player;

// Add stop gap so button is only active when the right player is interacting with the right controls (run if player = 1)