class Player{
    constructor(player) {
        this.activePlayer = player;
    }

    controls() {
        document.addEventListener('keydown', (e) => {    
            if (this.activePlayer === 1) {
                if (e.key === 'ArrowLeft') {
                    moveHorizontal('left');
                } else if (e.key === "ArrowRight") {
                    moveHorizontal('right');
                };
            } else {
                if (e.key === "a") {
                    moveHorizontal('left');
                } else if (e.key === "d") {
                    moveHorizontal('right');
                };
            }    
        }); 
    };   
};

module.exports = Player;