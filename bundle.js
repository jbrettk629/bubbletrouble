/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/bubble.js":
/*!***********************!*\
  !*** ./lib/bubble.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {




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

/***/ }),

/***/ "./lib/canvas.js":
/*!***********************!*\
  !*** ./lib/canvas.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// import '../app/styles/game.css';
const GameView = __webpack_require__(/*! ./game_view */ "./lib/game_view.js");
const Game = __webpack_require__(/*! ./game */ "./lib/game.js");

document.addEventListener("DOMContentLoaded", () => {

    const canvasEl = document.getElementById("canvas");

    const ctx = canvasEl.getContext('2d');

    const game = new Game();
    new GameView(game, ctx).load();

})



/***/ }),

/***/ "./lib/character.js":
/*!**************************!*\
  !*** ./lib/character.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {


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

/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Bubble = __webpack_require__(/*! ./bubble */ "./lib/bubble.js");
const Character = __webpack_require__(/*! ./character */ "./lib/character.js");
const Wire = __webpack_require__(/*! ./wire */ "./lib/wire.js");
const Timer = __webpack_require__(/*! ./timer */ "./lib/timer.js");

const BUBBLES = { 
            70: { color: "red", radius: 70, vx: 1.5, vy: 8.5, gravity: .12, points: 10 },
            40: { color: "orange", radius: 40, vx: 1.5, vy: 7.8, gravity: .12, startVy: -4, points: 15 },
            20: { color: "green", radius: 20, vx: 1.5, vy: 6.8, gravity: .12, startVy: -4, points: 20 },
            10: { color: "blue", radius: 10, vx: 1.5, vy: 5.4, gravity: .12, startVy: -5.5, points: 25 },
            5: { color: "purple", radius: 5, vx: 1.5, vy: 4, gravity: .12, startVy: -6.3, points: 30 }
};

const DEFAULT = { x: 200, y: 200, color: "red", radius: 70, vx: 1.5, vy: 8.5, gravity: .12, points: 10 }


class Game{
    constructor(){
        this.bubbles = [];
        this.character = [];
        this.wire = [];
        this.addBubbles();
        this.timer = [];
        this.startTimer();
        this.lives = 5;
        this.points = 0
    }

    startTimer(){
        this.timer.push(new Timer);
    }
    
    addBubbles(options = DEFAULT){
        this.bubbles.push(new Bubble(options))
    }
    
    addCharacter(){
        let options = {x: 350, y: 450}
        this.character.push(new Character(options));
    }
    
    addWire(){
        if (this.wire.length === 0){
            let pos = [this.character[0].posX+15, this.character[0].posY+50];
            this.wire.push(new Wire(pos))
        }
    }
    
    allObjects(){
        return [].concat(this.bubbles, this.character, this.wire, this.timer);
    }
    
    draw(ctx){
        ctx.clearRect(0,0,1000,600);
        ctx.fillStyle = "lightgrey";
        ctx.fillRect(0, 0, 805, 505);
        ctx.fillStyle = "lightblue";
        ctx.fillRect(5, 5, 795, 495);
        this.allObjects().forEach(object => {
            console.log(object);
            object.draw(ctx)
        })
        this.displayPoints(ctx);

    }

    gameOver(){
        this.character[0].lives -= 1;
        // debugger;
        this.stopAnimation();
        if (this.character[0].lives > 0){
            setTimeout(() => this.continueAnimation(), 2500);
        }
    }

    checkTimer(){
        if (this.timer[0].outOfTime()){
            this.gameOver();
        }
    }

    checkWon(){
        if (this.bubbles.length === 0){
            //display won, play again?
        }
    }
    
    checkCollisions(){
        this.wire.forEach( wire => {
            if (wire.endPos[1] <= 0){
                this.wire = [];
            }
        })
        this.bubbles.forEach( bubble => {
            if (bubble.posY-bubble.radius <= 5){
                let points = bubble.points * 2
          
                this.addPoints(points);
                this.removeBubble(bubble);

            }
            if (this.character[0].isCollidedWith(bubble)){
                // debugger;
                this.gameOver();
            }
            
            if (this.wire.length != 0 && this.wire[0].isCollidedWith(bubble)){
                this.wire = [];
                this.hitBubble(bubble);
            }
        })
    }

    removeBubble(bubble){
        let bubbleIdx = this.bubbles.indexOf(bubble);
        this.bubbles.splice(bubbleIdx,1)
     }

     addPoints(points){
         this.points += points;
     }
    
    hitBubble(bubble){

        this.addPoints(bubble.points);

        const posX = bubble.posX;
        const posY = bubble.posY;
        const newVx = bubble.vx;
   
        if (bubble.radius === 70){
            let newBub1 = Object.assign(BUBBLES[40], {x: posX, y: posY, vx: newVx})
            this.addBubbles(newBub1);

            let newBub2 = Object.assign(BUBBLES[40], { x: posX, y: posY, vx: newVx * (-1)})
            this.addBubbles(newBub2);

        } else if (bubble.radius != 5) {
            let id = bubble.radius / 2;
            let newBub1 = Object.assign(BUBBLES[id], {
                x: posX,
                y: posY,
                vx: newVx
            });
            this.addBubbles(newBub1);

            let newBub2 = Object.assign(BUBBLES[id], {
                x: posX,
                y: posY,
                vx: newVx * -1
            });
            this.addBubbles(newBub2); 
        }

        this.removeBubble(bubble);
    }
    
    step(){
        this.checkCollisions();
        if (this.timer[0].outOfTime()){
            this.gameOver();  
        }
        this.checkBubbles(); 
    }

    checkBubbles(){
        if (this.bubbles.length === 0){
            this.stopAnimation();
            this.addTimePoints();
        }
    }

    addTimePoints(){
        // this.timer[0]
    }

    gameWon(){
        this.stopAnimation();
    }
    displayPoints(ctx){
        ctx.font = "30px Comic Sans MS";
        ctx.fillStyle = "black";
        ctx.fillText (`Points: ${this.points} `, 200, 550)
    }

    
}

module.exports = Game;



/***/ }),

/***/ "./lib/game_view.js":
/*!**************************!*\
  !*** ./lib/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {




class GameView {
    constructor(game, ctx){
        this.game = game;
        this.ctx = ctx;
        this.game.addCharacter();
        // this.game.startTimer();
        this.character = this.game.character[0];
        this.wire = this.game.wire[0];
        this.game.stopAnimation = this.stopAnimation.bind(this);
        this.game.continueAnimation = this.continueAnimation.bind(this);
    }

    
    move(down, e) {
        switch (e.keyCode) {
            case 37:
                this.character.left = down;
                break;
            case 39:
                this.character.right = down
                break;
            case 32:
                this.game.addWire();
                break;
        }
    }
    
    load(){
        addEventListener("keydown", this.move.bind(this, true), false);
        addEventListener("keyup", this.move.bind(this, false), false);
        
        this.lastTime = 0;
        this.getReady(this.ctx);
    }

    getReady(ctx){
        this.game.draw(this.ctx);

        
        ctx.fillStyle = "lightgrey";
        ctx.fillRect(250, 150, 300, 200);

        ctx.font = "30px Comic Sans MS";
        ctx.fillStyle = "black";
        ctx.fillText("Get Ready", 325, 250)
        // debugger;
        setTimeout(() => this.startAnimation(), 5000)
    }
    
    startAnimation(){
        // debugger;
        requestAnimationFrame(this.animate.bind(this))
    }

    stopAnimation(){
        // debugger
        // this.animate(performance.now()+1000/60);
        console.log("what")
        cancelAnimationFrame(this.req);
    }

    continueAnimation(){
        // debugger;
        // this.animate(performance.now());
        this.game.bubbles = [];
        this.game.addBubbles();
        this.character.posX = 450;
        this.character.posY = 450;
        this.game.timer = [];
        this.game.startTimer();
        this.game.points = 0;
        this.game.wire = [];

        this.lastTime = performance.now();
        this.getReady(this.ctx);

    }

    animate(time) {
        this.req = requestAnimationFrame(this.animate.bind(this))
     this.timeDelta = time - this.lastTime;
     
     this.game.step();
     this.game.draw(this.ctx);
     this.lastTime = time;

    }
}

module.exports = GameView;

/***/ }),

/***/ "./lib/timer.js":
/*!**********************!*\
  !*** ./lib/timer.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {


class Timer {
    constructor(){
        this.timer = 0
        this.on = true;
        this.timeLeft = 1 - this.timer;
    }

    draw(ctx){
        ctx.font = "30px Comic Sans MS";
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

/***/ }),

/***/ "./lib/wire.js":
/*!*********************!*\
  !*** ./lib/wire.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {


class Wire {
    constructor(pos){
        this.startPos = pos;
        this.endPos = [this.startPos[0], this.startPos[1] - 50];
        this.vy = -4.5
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



/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map