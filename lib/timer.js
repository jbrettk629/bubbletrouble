
class Timer {
    constructor(){
        this.timer = 0
        this.on = true;
        this.timeLeft = 1 - this.timer;
    }

    draw(ctx){
        ctx.fillStyle = "lightgrey"
        ctx.fillRect(830, 515, 90, 50);
        ctx.fillStyle = "grey"
        ctx.fillRect(833, 518, 84, 44);
        ctx.fillStyle = "white"
        ctx.fillRect(835,520, 80, 40);

        ctx.font = "bold 25px Comic Sans MS";
        ctx.fillStyle = "black";
        ctx.fillText("Timer", 840, 550)


        ctx.fillStyle = "lightgrey";
        ctx.fillRect(845,505,60,-505);

        ctx.fillStyle = "darkgrey";
        ctx.fillRect(850,500,50,-495);

        if (this.timer >= 1) {
            this.on = false;
        }
        if (this.on){
            // debugger;
            this.timer += .0003
        }
        ctx.fillStyle = "red";
        ctx.fillRect(850, 500, 50, -495+(495*this.timer));
    }

    outOfTime(){
        if (this.timer >= 1){
            this.on = false;
            return true
        }
        return false
    }
}

module.exports = Timer;