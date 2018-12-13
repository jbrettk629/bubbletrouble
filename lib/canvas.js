// import '../app/styles/game.css';
const GameView = require('./game_view');
const Game = require('./game');

document.addEventListener("DOMContentLoaded", () => {

    const canvasEl = document.getElementById("canvas");
    const ctx = canvasEl.getContext('2d');
    const game = new Game();
    new GameView(game, ctx).load();

})

