
class Timer {
    constructor(){
        this.timer = 0
        this.on = true;
    }

    draw(ctx){
        if (this.timer >= 1) {
            this.on = false;
        }
        if (this.on){
            // debugger;
            this.timer += .0005
        }
        ctx.fillStyle = "red";
        ctx.fillRect(1050, 600, 50, 0-(500*this.timer));
    }

    timeOut(){
        if (this.timer >= 1){
            this.on = false;
            return true
        }
        return false
    }
}

module.exports = Timer;