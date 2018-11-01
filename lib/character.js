
class Character {
    constructor(options){
        this.posX = options.x;
        this.posY = options.y;
        this.width = 30
        this.speed = 3;
        this.left = false;
        this.right = false;
    }

    draw(ctx){
        if (this.left) this.posX -= this.speed;
        if (this.right) this.posX += this.speed;
        ctx.fillStyle = "black";
        ctx.fillRect(this.posX, this.posY, 30, 50);
    }



    // move(dir, delta){
    //     // console.log(delta)
    //     const velocityScale = delta / NORMAL_FRAME_TIME_DELTA;
    //     // console.log(velocityScale);
    //     const offsetX = this.vx * velocityScale;
    //     // console.log(offsetX);
        
    //     if (dir === "left"){
    //         this.posX += ((this.vx + offsetX)*(-1));
    //     }
     
    //     if (dir === "right"){
    //         this.posX += (this.vx + offsetX);
    //     }
    // }

    isCollidedWith(obj){
        //checks for colission with the top of the player
        if ((obj.posY + obj.radius) >= this.posY && obj.posX >= this.posX && obj.posX <= this.posX + this.width){
       
             }
        //checks for collision with the right of the player
        if (obj.posX + obj.radius >= this.posX && obj.posX + obj.radius <= this.posX + this.width && obj.posY >= this.posY) {
        
        }
        //checks for collision with the left of the player
        if (obj.posX - obj.radius >= this.posX && obj.posX - obj.radius <= this.posX + this.width && obj.posY >= this.posY) {
      
        }
    }


}


const NORMAL_FRAME_TIME_DELTA = 700/60;

module.exports = Character;