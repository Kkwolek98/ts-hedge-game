import { Game } from "./app/core/Game";

const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const game = Game.getInstance();
game.canvas = canvas;

game.start().then(() => {
  gameLoop();
});

let lastFrameTime = 0;

function gameLoop(ts: number = 0) {
  game.ctx.clearRect(0, 0, canvas.width, canvas.height);
  game.deltaTime = ts - lastFrameTime;
  game.update();

  lastFrameTime = ts;

  requestAnimationFrame(gameLoop);
}