const Bubble = require('./bubble');
const Character = require('./character');
const Wire = require('./wire');

const BUBBLES = { 
                    70: { color: "red", radius: 70 },
                    40: {color: "orange", radius: 40},
                    20: {color: "green", radius: 20},
                    10: {color: "blue", radius: 10},
                    5: { color: "yellow", radius: 5}
}

class Game{
    constructor(){
        this.bubbles = [];
        this.character = [];
        this.wire = [];
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

    addWire(){
        debugger
        if (this.wire.length === 0){
            let pos = [this.character[0].posX+15, this.character[0].posY+50];
            this.wire.push(new Wire(pos))
        }
        // debugger;
    }

    allObjects(){
        return [].concat(this.bubbles, this.character, this.wire);
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
            if (this.wire.length != 0 && this.wire[0].isCollidedWith(bubble)){
                this.wire = [];
           
            }
        })
        
    }

    hitBubble(bubble){
        bubbleIdx = this.bubbles.indexOf(bubble)
        if (bubble.radius === 70){
            // let newBub1 = merge(BUBBLES.35, )

        }
        else if (bubble.radius != 5) {
            let newBub1 = new Bubble

        }
        this.bubbles.splice(bubbleIdx)
    }

    step(){
        this.checkCollisions();
    }

}

module.exports = Game;

