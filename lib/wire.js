
class Wire {
    constructor(pos){
        this.startPos = pos;
        this.endPos = [this.startPos[0], this.startPos[1] - 50];
        this.vy = -4
    }



    draw(ctx){
        // debugger;
        ctx.beginPath();
        ctx.moveTo(this.startPos[0], this.startPos[1]);
        ctx.lineTo(this.endPos[0], this.endPos[1])
        ctx.stroke();
        this.update();
    }

    update(){
        this.endPos[1] += this.vy
    }

    isCollidedWith(bubble){
        const bcx = bubble.posX;
        const bcy = bubble.posY;
        const wex = this.endPos[0];
        const wey = this.endPos[1];
        const rad = bubble.radius
       
       
        if (Math.sqrt((bcx - wex)**2 + (bcy - wey)**2) <= rad){
            return true;
        }
        if (bcy + rad - 5 > wey && wex >= bcx - rad && wex <= bcx + rad) {
            return true;
        }
    }
}

module.exports = Wire;

