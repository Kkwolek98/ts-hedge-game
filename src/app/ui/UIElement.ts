import { GameObject } from "../core/GameObject";
import { randomId } from "../core/randomId";

export class UIElement extends GameObject {
  public id: string = randomId();
  constructor() {
    super();
  }
}