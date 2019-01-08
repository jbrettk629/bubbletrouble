// import '../app/styles/game.css';
const GameView = require('./game_view');
const Game = require('./game');


document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("startButton");
    document.getElementById("canvas").style.visibility = "hidden";

    button.addEventListener("click", startGame)
})



function startGame() { 
    const button = document.getElementById("startButton");
    button.removeEventListener("click", startGame)
    button.style.display = "none";
     
    const canvasEl = document.getElementById("canvas");
    
    ctx = canvasEl.getContext('2d');
    game = new Game();
    console.log("hello");
    new GameView(game, ctx).load();
    
    canvasEl.style.visibility = "visible"
}



