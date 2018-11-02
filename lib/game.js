const Bubble = require('./bubble');
const Character = require('./character');
const Wire = require('./wire');
const Timer = require('./timer');

const BUBBLES = { 
                    70: { color: "red", radius: 70, vx: 1.5, vy: 8.5, gravity: .12},
                    40: { color: "orange", radius: 40, vx: 1.5, vy: 7.8, gravity: .12, startVy: -4},
                    20: { color: "green", radius: 20, vx: 1.5, vy: 6.8, gravity: .12, startVy: -4},
                    10: { color: "blue", radius: 10, vx: 1.5, vy: 5.4, gravity: .12, startVy: -5.5},
                    5: { color: "yellow", radius: 5, vx: 1.5, vy: 4, gravity: .12, startVy: -6.3}
};

const DEFAULT = { x: 400, y: 300, color: "red", radius: 70, vy: 8.5 };


class Game{
    constructor(){
        this.bubbles = [];
        this.character = [];
        this.wire = [];
        this.addBubbles();
        this.timer = [];
        this.startTimer();
    }

    startTimer(){
        this.timer.push(new Timer);
    }
    
    addBubbles(options = DEFAULT){
        this.bubbles.push(new Bubble(options))
    }
    
    addCharacter(){
        let options = {x: 550, y: 550}
        this.character.push(new Character(options));
    }
    
    addWire(){
        if (this.wire.length === 0){
            let pos = [this.character[0].posX+15, this.character[0].posY+50];
            this.wire.push(new Wire(pos))
        }
    }
    
    allObjects(){
        return [].concat(this.bubbles, this.character, this.wire, this.timer);
    }
    
    draw(ctx){ 
        ctx.clearRect(0,0,1300,700);
        ctx.fillStyle = "lightblue";
        ctx.fillRect(100, 100, 900, 500);
        this.allObjects().forEach(object => {
            console.log(object);
            object.draw(ctx)
        })

    }
    
    checkCollisions(){
        this.wire.forEach( wire => {
            if (wire.endPos[1] <= 100){
                this.wire = [];
            }
        })
        this.bubbles.forEach( bubble => {
            this.character[0].isCollidedWith(bubble);
            
            if (this.wire.length != 0 && this.wire[0].isCollidedWith(bubble)){
                this.wire = [];
                this.hitBubble(bubble);
            }
        })
        
    }
    
    hitBubble(bubble){
        let bubbleIdx = this.bubbles.indexOf(bubble);
        const posX = bubble.posX;
        const posY = bubble.posY;
        const newVx = bubble.vx;
   
        if (bubble.radius === 70){
            let newBub1 = Object.assign(BUBBLES[40], {x: posX, y: posY, vx: newVx})
            this.addBubbles(newBub1);

            let newBub2 = Object.assign(BUBBLES[40], { x: posX, y: posY, vx: newVx * (-1)})
            this.addBubbles(newBub2);
        }
        else if (bubble.radius != 5) {
            let id = bubble.radius / 2;
            let newBub1 = Object.assign(BUBBLES[id], {
                x: posX,
                y: posY,
                vx: newVx
            });
            this.addBubbles(newBub1);

            let newBub2 = Object.assign(BUBBLES[id], {
                x: posX,
                y: posY,
                vx: newVx * -1
            });
            this.addBubbles(newBub2); 
        }

        this.bubbles.splice(bubbleIdx,1)
    }
    
    step(){
        this.checkCollisions();
    }
    
}

module.exports = Game;

