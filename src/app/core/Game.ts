import { Player } from "../entities/player/Player";
import { Ground } from "../terrain/Ground";
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
  public ground!: Ground;

  constructor() {
    KeyboardInput.listen();
  }

  public async start(): Promise<void> {
    if (!this.canvas) throw new Error('canvas undefined');
    this.canvas.width = 1920;
    this.canvas.height = 1080;
    this.ctx = this.canvas.getContext('2d')!;

    await this.loadSprites();

    this.ground = new Ground();
    this.player = new Player();
  }

  public update(): void {
    this.ground.update();
    this.player.update();

    this.draw();
  }

  private draw(): void {

  }

  private async loadSprites(): Promise<void[]> {
    const sprites = ['hedgehog-sprite', 'ground-sprite'];
    return await Promise.all(sprites.map((sprite) => SpriteManager.load(sprite)));
  }

}