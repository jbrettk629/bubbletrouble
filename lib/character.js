
class Character {
    constructor(options){
        this.posX = options.x;
        this.posY = options.y;
        this.width = 30;
        this.speed = 2.4;
        this.left = false;
        this.right = false;
        this.lives = 5;
    }

    draw(ctx){
        if (this.left && this.posX >= 0+this.speed) this.posX -= this.speed;
        if (this.right && this.posX+this.width <= 800-this.speed) this.posX += this.speed;
        ctx.fillStyle = "black";
        ctx.fillRect(this.posX, this.posY, this.width, 50);
        this.displayLives(ctx);
    }

    isCollidedWith(obj){
        const rad = obj.radius - 3;
        const bcx = obj.posX;
        const bcy = obj.posY;
        const rx = this.posX;
        const ry = this.posY;
        const lx = this.posX + this.width;
        const ly = this.posY;

        //checks for colission with the top of the player
        if ((bcy + rad) >= ry && bcx >= rx && bcx <= lx){
            // this.loseLife();
            return true;
             }
        //checks for collision with the right of the player
        if (bcx + rad >= rx && bcx + rad <= lx && bcy >= ry) {
            // this.loseLife();
            return true;
        }
        //checks for collision with the left of the player
        if (bcx - rad >= rx && bcx - rad <= lx && bcy >= ly) {
            // this.loseLife();
            return true;
        }
        // console.log(Math.sqrt((bcx - rx) ** 2 + (bcy - ry) ** 2), rad);
        if ((Math.sqrt((bcx - rx) ** 2 + (bcy - ry) ** 2) <= rad) || (Math.sqrt((bcx - lx) ** 2 + (bcy - ly) ** 2) <= rad)){
            // this.loseLife();
            return true;
        }
    }

    loseLife(){
        this.lives -= 1;
    }

    displayLives(ctx){
        ctx.font = "30px Comic Sans MS";
        ctx.fillStyle = "black";
        ctx.fillText(`Lives: ${this.lives} `, 0, 550)
    }


}




module.exports = Character;