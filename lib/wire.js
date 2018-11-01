
class Wire {
    constructor(pos){
        this.startPos = pos;
        this.endPos = [this.startPos[0], this.startPos[1] - 50];
        this.vy = -3
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
    //needs to disappear
        //when it hits the ceiling

        //when it hits a balloon

    isCollidedWith(bubble){
        const bcx = bubble.posX;
        const bcy = bubble.posY;
        const wex = this.endPos[0];
        const wey = this.endPos[1];
        // if this.startPos[0]
        if (this.endPos[1] <= 100){
            // this.remove();
            return true;
        }
        if (Math.sqrt((bcx - wex)**2 + (bcy - wey)**2) <= bubble.radius){
            return true;
        }

        if (bcy + bubble.radius - 5 > wey && wex >= bcx - bubble.radius && wex <= bcx + bubble.radius){
            return true;
        }

    }

    // remove(){
    //     this.startPos = [0,0];
    //     this.endPos = [0,0];
    // }
}

module.exports = Wire;

