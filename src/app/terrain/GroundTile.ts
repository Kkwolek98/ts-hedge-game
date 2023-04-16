import { PhysicsObject } from "../core/Physics";
import { Sprite } from "../core/Sprite";
import { Frame, SpriteManager } from "../core/SpriteManager";

export class GroundTile extends PhysicsObject {
  private sprite: Sprite;
  private frame: Frame;
  constructor(public position: number[] = [0, 0]) {
    const spriteData = SpriteManager.sprites.get('ground-sprite')!;
    const sprite = new Sprite(spriteData, 'ground');
    super(sprite, false);

    this.sprite = sprite;
    this.frame = this.sprite.getRandomFrameData();
  }

  public update(): void {
    this.draw();
  }

  protected draw(): void {
    const { frame } = this.frame;

    this.game.ctx.drawImage(this.sprite.image, frame.x, frame.y, frame.w, frame.h, this.position[0], this.position[1], frame.w, frame.h);
  }
}