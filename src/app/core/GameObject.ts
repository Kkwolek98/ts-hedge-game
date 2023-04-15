import { Game } from "./Game";

export class GameObject {
  protected readonly game = Game.getInstance();

  public update() {
    throw Error('update() not implemented');
  }

  protected draw() {
    throw Error('draw() not implemented');
  }
}