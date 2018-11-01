

const DEFAULTS = {
    RADIUS: 80,
    COLOR: "purple",
}

class Bubble {
    constructor(options = DEFAULTS) {
        this.posX = options.x;
        this.posY = options.y;
        this.radius = options.radius;
        this.color = options.color;
        this.vx = 1.5;
        this.vy = options.vy || 8.5;
        this.bounceFactor = 1;
        this.gravity = 0.12;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI, true);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        this.update();
    }

    update(){
      
        this.posX += this.vx;
        this.posY += this.vy;
        this.vy += this.gravity;
        if (this.posY >= 530){
            this.vy = -8.5;
        }
        if (this.posX <= 170){
            this.vx = 1.5;
        }
        if (this.posX >= 930){
            this.vx = -1.5;
        }
        if (this.posY <= 100){
            this.vy = 8.5;
        }
    }

    //if it gets hit by the wire it splits into two new ones, going opposite directions

    //needs a function to see if there is a colision with the character
}

module.exports = Bubble;