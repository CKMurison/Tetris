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
                };
            } else {
                if (e.key === "a") {
                    this.game.moveHorizontal('left');
                } else if (e.key === "d") {
                    this.game.moveHorizontal('right');
                };
            }    
        }); 
    };   
};

module.exports = Player;

// Add stop gap so button is only active when the right player is interacting with the right controls (run if player = 1)