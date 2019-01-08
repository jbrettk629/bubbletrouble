const Bubble = require('./bubble');
const Character = require('./character');
const Wire = require('./wire');
const Timer = require('./timer');

const BUBBLES = { 
            70: { color: "red", radius: 70, vx: 1.5, vy: 8.5, gravity: .12, points: 10, bonus: 0 },
            40: { color: "orange", radius: 40, vx: 1.5, vy: 7.8, gravity: .12, startVy: -4, points: 15, bonus: 0 },
            20: { color: "green", radius: 20, vx: 1.5, vy: 6.8, gravity: .12, startVy: -4, points: 20, bonus: 200 },
            10: { color: "blue", radius: 10, vx: 1.5, vy: 5.4, gravity: .12, startVy: -5.5, points: 25, bonus: 100 },
            5: { color: "purple", radius: 5, vx: 1.5, vy: 4, gravity: .12, startVy: -6.3, points: 30, bonus: 50 }
};

const DEFAULT = { x: 200, y: 200, color: "red", radius: 70, vx: 1.5, vy: 8.5, gravity: .12, points: 10 }


class Game{
    constructor(){
        this.bubbles = [];
        this.character = [];
        this.wire = [];
        this.setBubbles(1)
        // this.addBubbles();
        this.timer = [];
        this.startTimer();
        this.lives = 5;
        this.startingPoints = 0
        this.points = 0;
        this.gameWon = false;
        this.over = false;
        this.level = 1;
        this.loadingLevel = false;
        this.levelWon = false;
        this.hit = false;
    }

    startTimer(){
        this.timer.push(new Timer);
    }

    setBubbles(level){
     
        switch(level){
            case 1:
                this.addBubbles(Object.assign(BUBBLES[20], {x: 200, y: 200}));
                break;
            case 2:
                this.addBubbles(Object.assign(BUBBLES[20], { x: 200, y: 200 }));
                this.addBubbles(Object.assign(BUBBLES[20], { x: 600, y: 200 }));
                break;
            case 3:
                this.addBubbles(Object.assign(BUBBLES[40], { x: 200, y: 200, vx: -1.5 }));
                this.addBubbles(Object.assign(BUBBLES[40], { x: 600, y: 200 }));
                break;
        }
    }
    
    addBubbles(options = DEFAULT){
        this.bubbles.push(new Bubble(options))
    }
    
    addCharacter(){
        let options = {x: 350, y: 450}
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
        ctx.clearRect(0,0,1000,600);
        this.drawborder(ctx);
        this.drawBackground(ctx);
        this.drawCeiling(ctx);
        this.allObjects().forEach(object => {
            object.draw(ctx)
        })
        this.displayPoints(ctx);
        this.gameOverModal(ctx);
    }
    
    drawborder(ctx){
        ctx.fillStyle = "lightgrey";
        ctx.fillRect(0, 0, 805, 505);
    }

    drawBackground(ctx){
        let grd = ctx.createLinearGradient(5, 5, 795, 495);
        grd.addColorStop(0, '#ceefff');
        grd.addColorStop(1, '#52bcff');
        ctx.fillStyle = grd;
        ctx.fillRect(5, 5, 795, 495);
    }

    drawCeiling(ctx){
        let i = 0;
        while (i <= 800){
            ctx.beginPath();
            ctx.moveTo(i,0);
            ctx.lineTo(i+6,0);
            ctx.lineTo(i+3,15)
            ctx.fillStyle = "grey"
            ctx.fill();
            i += 6;
        }
    }
    
    gameOver(){
        this.stopAnimation();
        if (this.character[0].lives > 0 && this.hit){
            this.points = this.startingPoints
            setTimeout(() => this.restartLevel(), 1000);
            this.character[0].lives -= 1;
        } else if (this.levelWon) {
            this.startingPoints = this.points
            console.log(this.level)
            this.nextLevel();
            this.levelWon = false;
        } else {
            this.over = true
        }
    }

    step(){
        this.checkBubbles(); 
        this.checkCollisions();
        this.checkTimer();
 
    }
        
    checkBubbles(){
        if (this.bubbles.length === 0){
            if (this.levelWon === false){
                this.addLevel();
                this.levelWon = true;
            }
            // this.gameWon = true;
            this.addTimePoints();
        }
    }
    
    checkTimer(){
        if (this.timer[0].outOfTime()){
            this.gameOver();
        }
    }

    addLevel(){
        this.level += 1;
    }
        
    checkCollisions(){
        this.wire.forEach( wire => {
            if (wire.endPos[1] <= 0){
                this.wire = [];
            }
        })
        this.bubbles.forEach( bubble => {
            if (bubble.posY-bubble.radius <= 5){
                let points = bubble.bonus    
                this.addPoints(points);
                this.removeBubble(bubble);
            }
             if (this.character[0].isCollidedWith(bubble)){
                 this.hit = true;
                 this.gameOver();
                 this.hit = false;
            }
            if (this.wire.length != 0 && this.wire[0].isCollidedWith(bubble)){
                this.wire = [];
                this.hitBubble(bubble);
            }
        })
    }

    removeBubble(bubble){
        let bubbleIdx = this.bubbles.indexOf(bubble);
        this.bubbles.splice(bubbleIdx,1)
     }

     addPoints(points){
         this.points += points;
     }
    
    hitBubble(bubble){

        this.addPoints(bubble.points);

        const posX = bubble.posX;
        const posY = bubble.posY;
        const newVx = bubble.vx;
   
        if (bubble.radius === 70){
            let newBub1 = Object.assign(BUBBLES[40], {x: posX, y: posY, vx: newVx})
            this.addBubbles(newBub1);

            let newBub2 = Object.assign(BUBBLES[40], { x: posX, y: posY, vx: newVx * (-1)})
            this.addBubbles(newBub2);

        } else if (bubble.radius != 5) {
            let id = bubble.radius / 2;
            let newBub1 = Object.assign(BUBBLES[id], { x: posX, y: posY, vx: newVx });
            this.addBubbles(newBub1);

            let newBub2 = Object.assign(BUBBLES[id], {x: posX, y: posY, vx: newVx * -1 });
            this.addBubbles(newBub2); 
        }
        this.removeBubble(bubble);
    }
    

    addTimePoints(){
        if (this.timer[0].timer < 1){
            this.points += 1;
            this.timer[0].timer += .001;
        } else {
          
            this.stopAnimation();
            this.nextLevel();
        }
    }

    displayPoints(ctx){

        ctx.fillStyle = "lightgrey"
        ctx.fillRect(240, 515, 90, 50);
        ctx.fillStyle = "grey"
        ctx.fillRect(243, 518, 84, 44);
        ctx.fillStyle = "white"
        ctx.fillRect(245, 520, 80, 40);

        ctx.font = "bold 25px Comic Sans MS";
        ctx.fillStyle = "red";
        ctx.fillText ('Points', 250, 550)

        ctx.fillStyle = "lightgrey"
        ctx.fillRect(350, 515, 120, 50);
        ctx.fillStyle = "grey"
        ctx.fillRect(353, 518, 114, 44);
        ctx.fillStyle = "white"
        ctx.fillRect(355, 520, 110, 40);

        ctx.font = "25px Comic Sans MS";
        ctx.fillStyle = "grey";
        ctx.fillText(`${this.points}`, 375, 550)


    }

    
}

module.exports = Game;

