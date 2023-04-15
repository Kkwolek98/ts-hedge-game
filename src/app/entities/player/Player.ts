import { KeyboardInput } from "../../core/KeyboardInput";
import { PhysicsObject } from "../../core/Physics";
import { Sprite } from "../../core/Sprite";
import { SpriteManager } from "../../core/SpriteManager";

const SPRITE_NAME = 'hedgehog-sprite'

export class Player extends PhysicsObject {
  private sprite: Sprite;

  constructor() {
    const spriteData = SpriteManager.sprites.get(SPRITE_NAME)!;
    const sprite = new Sprite(spriteData, 'run');
    super(sprite);

    this.sprite = sprite;
  }

  public override update() {
    this.sprite.update();
    this.handlePhysics();
    this.handleInput();

    this.position[0] += this.velocityX;
    this.position[1] += this.velocityY;

    this.draw();
  }

  protected override draw() {
    const { frame } = this.sprite.getCurrentFrameData();

    if (this.velocityX < 0) {
      // draw flipped sprite
      this.game.ctx.save();
      this.game.ctx.translate(this.game.canvas.width, 0);
      this.game.ctx.scale(-1, 1);
      this.game.ctx.drawImage(this.sprite.image, frame.x, frame.y, frame.w, frame.h, this.game.canvas.width - frame.w - this.position[0], this.position[1], frame.w, frame.h);
      this.game.ctx.restore();
    } else {
      this.game.ctx.drawImage(this.sprite.image, frame.x, frame.y, frame.w, frame.h, this.position[0], this.position[1], frame.w, frame.h);
    }
  }

  private handleInput(): void {
    if (KeyboardInput.isHeld('KeyD')) {
      this.velocityX += .5;
    } else if (KeyboardInput.isHeld('KeyA')) {
      this.velocityX -= .5;
    } else {
      this.velocityX += -(this.velocityX / 16)
    }

    if (KeyboardInput.isHeld('space')) {
      this.velocityY = -20;
    }


  }


}