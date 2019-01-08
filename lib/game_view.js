
class GameView {
    constructor(game, ctx){
        this.game = game;
        this.ctx = ctx;
        this.game.addCharacter();
        this.character = this.game.character[0];
        this.wire = this.game.wire[0];
        this.game.stopAnimation = this.stopAnimation.bind(this);
        this.game.restartLevel = this.restartLevel.bind(this);
        this.game.nextLevel = this.nextLevel.bind(this);
        this.game.gameOverModal = this.gameOverModal.bind(this);
    }

    
    move(down, e) {
        switch (e.keyCode) {
            case 37:
                this.character.left = down;
                break;
            case 39:
                this.character.right = down
                break;
            case 32:
                this.game.addWire();
                break;
        }
    }

    gameOverModal(ctx){
        if (this.game.over || this.game.gameWon){
            ctx.fillStyle = "lightgrey";
            ctx.fillRect(245, 145, 310, 210);
            ctx.fillStyle = "grey";
            ctx.fillRect(248, 148, 304, 204);
            ctx.fillStyle = "white";
            ctx.fillRect(250, 150, 300, 200);

            ctx.font = "bold 40px Comic Sans MS";
            ctx.fillStyle = "red";
            if (this.game.gameWon){
                ctx.fillText("You Won!", 300, 250)
            } else {
                ctx.fillText("Game Over", 300, 250)
            }
        }
    }

    // replayButton(ctx){
    //     ctx.fillStyle = "grey";
    //     ctx.fillRect()
    // }

    // replay(){
    //     this.game.lives = 5
    //     this.continueAnimation();
    // }
    
    load(){
        addEventListener("keydown", this.move.bind(this, true), false);
        addEventListener("keyup", this.move.bind(this, false), false);
        
        console.log("load game")
        this.getReady(this.ctx);
    }

    getReady(ctx){
        console.log("get ready")
        this.game.draw(this.ctx);

        
        ctx.fillStyle = "lightgrey";
        ctx.fillRect(250, 150, 300, 200);

        ctx.font = "30px Comic Sans MS";
        ctx.fillStyle = "black";
        ctx.fillText("Get Ready", 325, 250)
        ctx.fillStyle = "black";
        ctx.fillText(`Level ${this.game.level}`, 350, 300);
        setTimeout(() => this.startAnimation(), 3500)
    }
    
    startAnimation(){
        requestAnimationFrame(this.animate.bind(this))
    }

    stopAnimation(){
        cancelAnimationFrame(this.req);
    }

    restartLevel(){
        console.log("restart level")
        this.game.bubbles = [];
        this.game.setBubbles(this.game.level);
        // this.game.addBubbles();
        this.character.posX = 350;
        this.character.posY = 450;
        this.game.timer = [];
        this.game.startTimer();
        this.game.points = this.game.startingPoints;
        this.game.wire = [];
        // this.lastTime = performance.now();
        this.getReady(this.ctx);
    }

    nextLevel(){
        console.log("next level")
        this.game.setBubbles(this.game.level);
        this.character.posX = 350;
        this.character.posY = 450;
        this.game.timer = [];
        this.game.startTimer();
        this.getReady(this.ctx);
    }

    animate(time) {
     this.req = requestAnimationFrame(this.animate.bind(this))
     
     this.game.step(this.ctx);
     this.game.draw(this.ctx);
    //  this.lastTime = time;

    }
}

module.exports = GameView;