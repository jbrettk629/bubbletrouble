const Bubble = require('./bubble');
const Character = require('./character');

class Game{
    constructor(){
        this.bubbles = [];
        this.character = [];
        this.addBubbles();
    }

    addBubbles(){
        let options = {x: 400, y: 300, color: "red", radius: 70}
        this.bubbles.push(new Bubble(options))
    }

    addCharacter(){
        let options = {x: 550, y: 550}
        this.character.push(new Character(options));
    }

    allObjects(){
        return [].concat(this.bubbles, this.character);
    }

    draw(ctx){  
        ctx.clearRect(0,0,1300,700);
        ctx.fillStyle = "lightblue";
        ctx.fillRect(100, 100, 900, 500);
        this.allObjects().forEach(object => object.draw(ctx))
    }

    checkCollisions(){
        this.bubbles.forEach( bubble => {
            this.character[0].isCollidedWith(bubble);
        })
    }

    step(){
        this.checkCollisions();
    }

}

module.exports = Game;

