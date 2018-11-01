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



const DEFAULTS = {
    RADIUS: 80,
    COLOR: "purple",
}

class Bubble {
    constructor(options = DEFAULTS) {
        this.posX = options.x;
        this.posY = options.y;
        this.radius = options.radius;
        this.color = options.color;
        this.vx = 1.5;
        this.vy = 8.5;
        this.bounceFactor = 1;
        this.gravity = 0.12;
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
      
        this.posX += this.vx;
        this.posY += this.vy;
        this.vy += this.gravity;
        if (this.posY >= 530){
            this.vy = -8.5;
        }
        if (this.posX <= 170){
            this.vx = 1.5;
        }
        if (this.posX >= 930){
            this.vx = -1.5;
        }
        if (this.posY <= 100){
            this.vy = 8.5;
        }
    }

    //needs to bounce

    //if it gets hit by the wire it splits into two new ones, going opposite directions

    //needs a function to see if there is a colision with the character
}

module.exports = Bubble;

/***/ }),

/***/ "./lib/canvas.js":
/*!***********************!*\
  !*** ./lib/canvas.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const GameView = __webpack_require__(/*! ./game_view */ "./lib/game_view.js");
const Game = __webpack_require__(/*! ./game */ "./lib/game.js");

document.addEventListener("DOMContentLoaded", () => {

    const canvasEl = document.getElementById("canvas");

    const ctx = canvasEl.getContext('2d');
    

    // ctx.beginPath();
    // ctx.arc(100, 100, 20, 0, 2 * Math.PI, true);
    // ctx.fillStyle = "blue";
    // ctx.fill();

    const game = new Game();
    new GameView(game, ctx).start();

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

/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Bubble = __webpack_require__(/*! ./bubble */ "./lib/bubble.js");
const Character = __webpack_require__(/*! ./character */ "./lib/character.js");

class Game{
    constructor(){
        this.bubbles = [];
        this.character = [];
        this.addBubbles();
    }

    addBubbles(){
        let options = {x: 400, y: 300, color: "red", radius: 70}
        this.bubbles.push(new Bubble(options))
    }

    addCharacter(){
        let options = {x: 550, y: 550}
        this.character.push(new Character(options));
    }

    allObjects(){
        return [].concat(this.bubbles, this.character);
    }

    draw(ctx){  
        ctx.clearRect(0,0,1300,700);
        ctx.fillStyle = "lightblue";
        ctx.fillRect(100, 100, 900, 500);
        this.allObjects().forEach(object => object.draw(ctx))
    }

    checkCollisions(){
        this.bubbles.forEach( bubble => {
            this.character[0].isCollidedWith(bubble);
        })
    }

    step(){
        this.checkCollisions();
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
        this.character = this.game.character[0];
    }

    
    move(e) {
        // debugger;
        switch (e.keyCode) {
            case 37:
                // debugger;
                // this.character.left = !(this.character.left);
                this.character.move("left", this.timeDelta);
                break;
            case 39:
            // debugger;
                // this.character.right = !(this.character.right);
                this.character.move("right", this.timeDelta);
                break;
        }
    }
    
    start(){
        addEventListener("keydown", this.move.bind(this), false);
    
        // this.game.draw(this.ctx);
        this.lastTime = 0;
        //start aimation
        requestAnimationFrame(this.animate.bind(this));
    }

    animate(time) {
     this.timeDelta = time - this.lastTime;
     
     this.game.step();
     this.game.draw(this.ctx);
     this.lastTime = time;

     //every call to animate requests causes another call to animate
     requestAnimationFrame(this.animate.bind(this))
    }
}

module.exports = GameView;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map