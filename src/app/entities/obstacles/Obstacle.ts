import { PhysicsObject } from "../../core/Physics";

export class Obstacle extends PhysicsObject {
  constructor(position: number[]) {
    super(undefined, false);

    this.position = position;
  }

  public update(): void {
    if (this.game.isScrolling()) {
      this.velocityX = this.game.player.velocityX;
    } else {
      this.velocityX = 0;
    }

    this.position[0] -= this.velocityX

    this.draw();
  }

  protected draw(): void {
    this.game.ctx.save();
    this.game.ctx.fillStyle = 'red';
    this.game.ctx.fillRect(this.position[0], this.position[1], 96, 96);
    this.game.ctx.restore();
  }

}