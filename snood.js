document.addEventListener("DOMContentLoaded", function(){
    const canvasEl = document.getElementById("myCanvas");
    canvasEl.width = 500;
    canvasEl.height = 800;

    const ctx = canvasEl.getContext('2d');
    ctx.fillStyle = "red";
    ctx.fillRect =(0,0,500,500);

    
});