


class GameView {
    constructor(game, ctx){
        this.game = game;
        this.ctx = ctx;
        this.game.addCharacter();
        this.character = this.game.character[0];
        this.wire = this.game.wire[0];
        this.game.stopAnimation = this.stopAnimation.bind(this);
        this.game.continueAnimation = this.continueAnimation.bind(this);
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
        if (this.game.over || this.gameWon){
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

    replayButton(ctx){
        ctx.fillStyle = "grey";
        ctx.fillRect()
    }

    replay(){
        this.game.lives = 5
        this.continueAnimation();
    }
    
    load(){
        addEventListener("keydown", this.move.bind(this, true), false);
        addEventListener("keyup", this.move.bind(this, false), false);
        
        this.lastTime = 0;
        this.getReady(this.ctx);
    }

    getReady(ctx){
        this.game.draw(this.ctx);

        
        ctx.fillStyle = "lightgrey";
        ctx.fillRect(250, 150, 300, 200);

        ctx.font = "30px Comic Sans MS";
        ctx.fillStyle = "black";
        ctx.fillText("Get Ready", 325, 250)
        setTimeout(() => this.startAnimation(), 3500)
    }
    
    startAnimation(){
        requestAnimationFrame(this.animate.bind(this))
    }

    stopAnimation(){
        // debugger;
        cancelAnimationFrame(this.req);
    }

    continueAnimation(){
        this.game.bubbles = [];
        this.game.addBubbles();
        this.character.posX = 450;
        this.character.posY = 450;
        this.game.timer = [];
        this.game.startTimer();
        this.game.points = 0;
        this.game.wire = [];

        this.lastTime = performance.now();
        this.getReady(this.ctx);

    }

    animate(time) {
     this.req = requestAnimationFrame(this.animate.bind(this))
     this.timeDelta = time - this.lastTime;
     
     this.game.step(this.ctx);
     this.game.draw(this.ctx);
     this.lastTime = time;

    }
}

module.exports = GameView;