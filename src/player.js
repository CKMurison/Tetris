class Player{
    constructor(player, game) {
        this.activePlayer = player;
        this.game = game;
        this.controls();
        this.linesCleared = 0;
        this.powerUps = [powerUps.speedUp, powerUps.bizarre, powerUps.removeBlock]
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

        document.addEventListener('keyup', (e) => {
            if (e.key == " " && this.activePlayer === 1) {
                this.game.pauseGame();
            }
        })
    };

    incrementLineCounter() {
        this.linesCleared++;
    }
};

module.exports = Player;