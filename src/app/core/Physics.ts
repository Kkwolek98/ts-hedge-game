import { GameObject } from "./GameObject";
import { Sprite } from "./Sprite";
import { GRAVITY } from "./utils/settings";
import { Velocity } from "./Velocity.interface";

export class PhysicsObject extends GameObject implements Velocity {
  public position: number[] = [100, 600]
  public velocityX: number = 0;
  public velocityY: number = 0;
  public jumpsPerformed: number = 0;
  public maxVelocityX: number = 10;

  private spriteSize?: { w: number, h: number };

  constructor(sprite?: Sprite, private gravityAffected: boolean = true) {
    super();

    if (sprite) {
      this.spriteSize = sprite.getCurrentFrameData().sourceSize;
    }
  }

  protected handlePhysics(): void {
    if (!this.gravityAffected) return;

    if (this.position[1] + this.velocityY + (this.spriteSize?.h ?? 0) < this.game.canvas.height - this.game.ground.height) {
      this.velocityY += GRAVITY;
    } else {
      this.jumpsPerformed = 0;
      this.velocityY = 0;
    }
  }

}