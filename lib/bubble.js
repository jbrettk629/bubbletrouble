


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
        this.points = options.points;
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
            this.posY += this.startingVy
            this.startingVy += this.gravity
        } else {
            this.posY += this.vy;
            this.vy += this.gravity;
        }
    
        this.posX += this.vx;

        if (this.posY >= 500-this.radius){
            this.count = 1;
            this.vy = this.defaultVy*(-1);
        }
        if (this.posX <= 5+this.radius){
            this.vx = 1.5;
        }
        if (this.posX >= 800-this.radius){
            this.vx = -1.5;
        }
        if (this.posY <= 100){
            this.vy = this.defaultVy;
        }
    }
}

module.exports = Bubble;