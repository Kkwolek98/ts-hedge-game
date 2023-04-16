import { GameObject } from "./GameObject";
import { Sprite } from "./Sprite";
import { Velocity } from "./Velocity.interface";

export class PhysicsObject extends GameObject implements Velocity {
  public position: number[] = [100, 100]
  public velocityX: number = 0;
  public velocityY: number = 0;
  public jumpsPerformed: number = 0;
  public maxVelocityX: number = 10;

  private readonly GRAVITY_ACCELERATION: number = .69;
  private spriteSize: { w: number, h: number };

  constructor(sprite: Sprite) {
    super();

    this.spriteSize = sprite.getCurrentFrameData().sourceSize;
  }

  protected handlePhysics(): void {
    if (this.position[1] + this.velocityY + this.spriteSize.h < this.game.canvas.height) {
      this.velocityY += this.GRAVITY_ACCELERATION;
    } else {
      this.jumpsPerformed = 0;
      this.velocityY = 0;
    }
  }

}