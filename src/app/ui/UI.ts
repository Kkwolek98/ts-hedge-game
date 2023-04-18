import { GameObject } from "../core/GameObject";
import { MetersWalked } from "./MetersWalked";
import { UIElement } from "./UIElement";

export class UI extends GameObject {
  private uiElements: UIElement[] = [];

  constructor() {
    super();

    this.registerElement(new MetersWalked());
  }

  public update(): void {
    this.uiElements.forEach((element) => element.update())
  }

  public registerElement(uiElement: UIElement): void {
    this.uiElements.push(uiElement);
  }

  protected draw(): void {

  }
}