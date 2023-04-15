import { GameObject } from "../../core/GameObject";
import { Sprite } from "../../core/Sprite";
import { FrameData, SpriteManager } from "../../core/SpriteManager";

const SPRITE_NAME = 'hedgehog-sprite'

export class Player extends GameObject {

  private sprite: Sprite;
  private position: number[] = [100, 100]

  constructor() {
    super();

    const spriteData = SpriteManager.sprites.get(SPRITE_NAME)!;

    this.sprite = new Sprite(spriteData, 'run');

    window.addEventListener('keypress', () => {
      this.position[0] += 5
    })
  }

  public override update() {
    this.sprite.update();

    this.draw();
  }

  protected override draw() {
    const frame = this.sprite.getCurrentFramePosition();

    this.game.ctx.drawImage(this.sprite.image, frame.framePosition[0], frame.framePosition[1], frame.frameDimensions[0], frame.frameDimensions[1], this.position[0], this.position[1], frame.frameDimensions[0] * 3, frame.frameDimensions[1] * 3)
  }


}