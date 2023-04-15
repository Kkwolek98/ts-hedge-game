import { Game } from "./app/core/Game";

const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const game = Game.getInstance();
game.canvas = canvas;

game.start().then(() => {
  gameLoop();
});

function gameLoop() {
  game.ctx.clearRect(0, 0, canvas.width, canvas.height);
  game.update();
  requestAnimationFrame(gameLoop);
}