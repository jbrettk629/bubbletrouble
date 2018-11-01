


class GameView {
    constructor(game, ctx){
        this.game = game;
        this.ctx = ctx;
        this.game.addCharacter();
        this.character = this.game.character[0];
        this.wire = this.game.wire[0];
    }

    
    move(down, e) {
        // debugger;
        switch (e.keyCode) {
            case 37:
                // debugger;
                this.character.left = down;
                // this.character.move("left", this.timeDelta);
                break;
            case 39:
            // debugger;
                this.character.right = down
                // this.character.move("right", this.timeDelta);
                break;
            case 32:
                // debugger;w
                this.game.addWire();
                break;
        }
    }
    
    start(){
        addEventListener("keydown", this.move.bind(this, true), false);
        addEventListener("keyup", this.move.bind(this, false), false);
    
        // this.game.draw(this.ctx);
        this.lastTime = 0;
        //start aimation
        requestAnimationFrame(this.animate.bind(this));
    }

    animate(time) {
     this.timeDelta = time - this.lastTime;
     
     this.game.step();
     this.game.draw(this.ctx);
     this.lastTime = time;

     //every call to animate requests causes another call to animate
     requestAnimationFrame(this.animate.bind(this))
    }
}

module.exports = GameView;