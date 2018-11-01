
class Character {
    constructor(options){
        this.posX = options.x;
        this.posY = options.y;
        this.width = 30
        this.vx = 3;
    }

    draw(ctx){
        ctx.fillStyle = "black";
        ctx.fillRect(this.posX, this.posY, 30, 50);
    }



    move(dir, delta){
        // console.log(delta)
        const velocityScale = delta / NORMAL_FRAME_TIME_DELTA;
        // console.log(velocityScale);
        const offsetX = this.vx * velocityScale;
        // console.log(offsetX);
        
        if (dir === "left"){
            this.posX += ((this.vx + offsetX)*(-1));
        }
     
        if (dir === "right"){
            this.posX += (this.vx + offsetX);
        }
    }

    isCollidedWith(obj){
        //checks for colission with the top of the player
        if ((obj.posY + obj.radius) >= this.posY && obj.posX >= this.posX && obj.posX <= this.posX + this.width){
      
                 console.log("TOP COLLISION")
            console.log(obj.posY + obj.radius >= this.posY, obj.posX >= this.posX, obj.posX <= this.posX + this.width);
             }
        //checks for collision with the right of the player
        if (obj.posX + obj.radius >= this.posX && obj.posX + obj.radius <= this.posX + this.width && obj.posY >= this.posY) {

            console.log("RIGHT COLLISION")
        }
        if (obj.posX - obj.radius >= this.posX && obj.posX - obj.radius <= this.posX + this.width && obj.posY >= this.posY) {

            console.log("LEFT COLLISION");
        }
    


    }


}


const NORMAL_FRAME_TIME_DELTA = 1000/60;

module.exports = Character;