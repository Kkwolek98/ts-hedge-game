import { KeyboardInput } from "../../core/KeyboardInput";
import { PhysicsObject } from "../../core/Physics";
import { SCROLL_POSITION } from "../../core/settings";

export class Obstacle extends PhysicsObject {
  constructor(position: number[]) {
    super(undefined, false);

    this.position = position;
  }

  public update(): void {
    if (this.game.player.position[0] > SCROLL_POSITION * this.game.canvas.width && KeyboardInput.isHeld('KeyD')) {
      this.position[0] -= this.game.player.velocityX;
    }

    this.draw();
  }

  protected draw(): void {
    this.game.ctx.save();
    this.game.ctx.fillStyle = 'red';
    this.game.ctx.fillRect(this.position[0], this.position[1], 96, 96);
    this.game.ctx.restore();
  }

}