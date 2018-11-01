


class GameView {
    constructor(game, ctx){
        this.game = game;
        this.ctx = ctx;
        this.game.addCharacter();
        this.character = this.game.character[0];
    }

    
    move(e) {
        // debugger;
        switch (e.keyCode) {
            case 37:
                // debugger;
                // this.character.left = !(this.character.left);
                this.character.move("left", this.timeDelta);
                break;
            case 39:
            // debugger;
                // this.character.right = !(this.character.right);
                this.character.move("right", this.timeDelta);
                break;
        }
    }
    
    start(){
        addEventListener("keydown", this.move.bind(this), false);
    
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