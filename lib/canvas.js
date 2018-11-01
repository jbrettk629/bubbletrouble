const GameView = require('./game_view');
const Game = require('./game');

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

