import { Player } from "../entities/player/Player";
import { KeyboardInput } from "./KeyboardInput";
import { SpriteManager } from "./SpriteManager";

export class Game {
  //singleton
  private static _instance: Game;
  public static getInstance(): Game {
    if (!this._instance) {
      this._instance = new Game();
    }

    return this._instance;
  }

  public deltaTime: number = 0;

  public canvas!: HTMLCanvasElement;
  public ctx!: CanvasRenderingContext2D;
  public player!: Player;

  constructor() {
    KeyboardInput.listen();
  }

  public async start(): Promise<void> {
    if (!this.canvas) throw new Error('canvas undefined');
    this.canvas.width = 1920;
    this.canvas.height = 1080;
    this.ctx = this.canvas.getContext('2d')!;

    await this.loadSprites();

    this.player = new Player();
  }

  public update(): void {
    this.player.update();

    this.draw();
  }

  private draw(): void {

  }

  private async loadSprites(): Promise<void> {
    return await SpriteManager.load('hedgehog-sprite');
  }

}