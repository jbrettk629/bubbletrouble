
class Character {
    constructor(options){
        this.posX = options.x;
        this.posY = options.y;
        this.vx = 3;
    }

    draw(ctx){
        ctx.fillStyle = "black";
        ctx.fillRect(this.posX, this.posY, 30, 50);
    }



    move(dir, delta){
        console.log(delta)
        const velocityScale = delta / NORMAL_FRAME_TIME_DELTA;
        console.log(velocityScale);
        const offsetX = this.vx * velocityScale;
        console.log(offsetX);
        
        if (dir === "left"){
            this.posX += ((this.vx + offsetX)*(-1));
        }
     
        if (dir === "right"){
            this.posX += (this.vx + offsetX);
        }
    }


}

const NORMAL_FRAME_TIME_DELTA = 1000/60;

module.exports = Character;