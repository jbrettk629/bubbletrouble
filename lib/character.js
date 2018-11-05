
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
        // checks for collision with the corners of the playerc
        if ((Math.sqrt((bcx - rx) ** 2 + (bcy - ry) ** 2) <= rad) || (Math.sqrt((bcx - lx) ** 2 + (bcy - ly) ** 2) <= rad)){
            // this.loseLife();
            return true;
        }
    }

    loseLife(){
        this.lives -= 1;
    }

    displayLives(ctx){

        ctx.fillStyle = "lightgrey"
        ctx.fillRect(0, 515, 80, 50);
        ctx.fillStyle = "grey"
        ctx.fillRect(3, 518, 74, 44);
        ctx.fillStyle = "white"
        ctx.fillRect(5, 520, 70, 40);

        ctx.font = "bold 25px Comic Sans MS";
        ctx.fillStyle = "red";
        ctx.fillText('Lives', 10, 550)

        ctx.fillStyle = "lightgrey";
        ctx.fillRect(100, 515, 60, 50);
        ctx.fillStyle = "grey";
        ctx.fillRect(103, 518, 54, 44);
        ctx.fillStyle = "white";
        ctx.fillRect(105, 520, 50, 40);

        ctx.font = "25px Comic Sans MS";
        ctx.fillStyle = "grey";
        ctx.fillText(`${this.lives}`, 120, 550);
    }


}




module.exports = Character;