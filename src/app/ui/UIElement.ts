import { GameObject } from "../core/GameObject";
import { randomId } from "../core/utils/randomId";

export class UIElement extends GameObject {
  public id: string = randomId();
  constructor() {
    super();
  }
}