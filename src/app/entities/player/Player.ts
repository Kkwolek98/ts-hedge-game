import { KeyboardInput } from "../../core/KeyboardInput";
import { PhysicsObject } from "../../core/Physics";
import { SCROLL_POSITION } from "../../core/settings";
import { Sprite } from "../../core/Sprite";
import { SpriteManager } from "../../core/SpriteManager";

const SPRITE_NAME = 'hedgehog-sprite'

export class Player extends PhysicsObject {
  private sprite: Sprite;
  private flipped: boolean = false;

  constructor() {
    const spriteData = SpriteManager.sprites.get(SPRITE_NAME)!;
    const sprite = new Sprite(spriteData);
    super(sprite);

    this.sprite = sprite;
  }

  public override update() {
    this.sprite.update();
    this.handlePhysics();
    this.handleInput();

    if (this.position[0] <= SCROLL_POSITION * this.game.canvas.width || this.velocityX <= 0) {
      this.position[0] += this.velocityX;
    }
    this.position[1] += this.velocityY;

    this.draw();
  }

  protected override draw() {
    const { frame } = this.sprite.getCurrentFrameData();

    if (this.flipped) {
      // draw flipped sprite
      this.game.ctx.save();
      this.game.ctx.translate(this.game.canvas.width, 0);
      this.game.ctx.scale(-1, 1);
      this.game.ctx.drawImage(this.sprite.image, frame.x, frame.y, frame.w, frame.h, this.game.canvas.width - frame.w - this.position[0], this.position[1], frame.w, frame.h);
      this.game.ctx.restore();
    } else {
      this.game.ctx.drawImage(this.sprite.image, frame.x + 1, frame.y, frame.w - 1, frame.h, this.position[0], this.position[1], frame.w, frame.h);
    }
  }

  private handleInput(): void {
    if (KeyboardInput.isHeld('KeyD')) {
      this.handleRightMovement();
    } else if (KeyboardInput.isHeld('KeyA')) {
      this.handleLeftMovement();
    } else {
      this.handleStop();
    }

    if (KeyboardInput.isHeld('space') && !this.jumpsPerformed) {
      this.velocityY = -15;
      this.jumpsPerformed++;
    }
  }

  private handleLeftMovement(): void {
    this.flipped = true;

    if (this.position[0] < 0) {
      this.velocityX = 0;
    } else {
      if (this.velocityX > -this.maxVelocityX) this.velocityX -= .5;
    }
  }

  private handleRightMovement(): void {
    this.flipped = false;
    if (this.velocityX < this.maxVelocityX) this.velocityX += .5;
  }

  private handleStop(): void {
    this.velocityX += -(this.velocityX / 10)
    if (
      Math.abs(this.velocityX) > 0 &&
      Math.abs(this.velocityX) < 0.25
    ) {
      this.velocityX = 0;
    }
  }


}