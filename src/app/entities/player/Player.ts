import { GameObject } from "../../core/GameObject";
import { Sprite } from "../../core/Sprite";
import { AnimationData, SpriteManager } from "../../core/SpriteManager";

const SPRITE_NAME = 'hedgehog-sprite'

export class Player extends GameObject {

  private sprite: Sprite;
  private position: number[] = [100, 100]

  constructor() {
    super();

    const spriteData = SpriteManager.sprites.get(SPRITE_NAME)!;

    this.sprite = new Sprite(spriteData, 'run');
  }

  public override update() {
    this.sprite.update();

    this.draw();
  }

  protected override draw() {
    const { frame } = this.sprite.getCurrentFrameData();

    this.game.ctx.drawImage(this.sprite.image, frame.x, frame.y, frame.w, frame.h, this.position[0], this.position[1], frame.w, frame.h)
  }


}