


class Bubble {
    constructor(options) {
        this.posX = options.x;
        this.posY = options.y;
        this.radius = options.radius;
        this.color = options.color;
        this.startingVy = options.startVy;
        this.defaultVy = options.vy;
        this.vx = options.vx || 1.5;
        this.vy = options.vy;
        this.bounceFactor = 1;
        this.gravity = options.gravity || 0.12;
        this.count = 0
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
    
        if (this.count === 0 && this.startingVy){
        //    debugger;
            this.posY += this.startingVy
            this.startingVy += this.gravity
        } else {
            // debugger;
            this.posY += this.vy;
            this.vy += this.gravity;
        }
    
        // this.vy ? this.posY += this.vy : ;
        // this.vy ? this.vy += this.gravity : ;
        this.posX += this.vx;
        // this.posY += this.vy
        if (this.posY >= 600-this.radius){
            this.count = 1;
            // debugger;
            this.vy = this.defaultVy*(-1);
            // debugger;
            // this.vy = -8.5;
        }
        if (this.posX <= 100+this.radius){
            this.vx = 1.5;
        }
        if (this.posX >= 1000-this.radius){
            this.vx = -1.5;
        }
        if (this.posY <= 100){
            this.vy = this.defaultVy;
        }
    }

    //if it gets hit by the wire it splits into two new ones, going opposite directions

    //needs a function to see if there is a colision with the character
}

module.exports = Bubble;