


class GameView {
    constructor(game, ctx){
        this.game = game;
        this.ctx = ctx;
        this.game.addCharacter();
        // this.game.startTimer();
        this.character = this.game.character[0];
        this.wire = this.game.wire[0];
        this.game.stopAnimation = this.stopAnimation.bind(this);
        this.game.continueAnimation = this.continueAnimation.bind(this);
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
        // debugger;
        setTimeout(() => this.startAnimation(), 5000)
    }
    
    startAnimation(){
        // debugger;
        requestAnimationFrame(this.animate.bind(this))
    }

    stopAnimation(){
        // debugger
        // this.animate(performance.now()+1000/60);
        console.log("what")
        cancelAnimationFrame(this.req);
    }

    continueAnimation(){
        // debugger;
        // this.animate(performance.now());
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
     
     this.game.step();
     this.game.draw(this.ctx);
     this.lastTime = time;

    }
}

module.exports = GameView;