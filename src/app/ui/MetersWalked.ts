import { UIElement } from "./UIElement";

export class MetersWalked extends UIElement {
  private metersWalked: number = 0;
  constructor() {
    super();
  }

  public update(): void {
    this.metersWalked = this.game.distanceWalked;
    this.draw();
  }

  protected draw(): void {
    this.game.ctx.save();
    this.game.ctx.font = "50px serif"
    this.game.ctx.strokeText(`${this.metersWalked.toFixed(2)}m`, 100, 100);
    this.game.ctx.restore();
  }
}