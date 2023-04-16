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
    this.drawBackground();
    this.ground.update();
    this.player.update();

    this.draw();
  }

  private draw(): void {

  }

  private drawBackground(): void {
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);

    gradient.addColorStop(0, '#35D6ED');
    gradient.addColorStop(0.1, '#35D6ED');
    gradient.addColorStop(0.2, '#65DDEF');
    gradient.addColorStop(0.3, '#65DDEF');
    gradient.addColorStop(0.4, '#7AE5F5');
    gradient.addColorStop(0.5, '#7AE5F5');
    gradient.addColorStop(0.6, '#97EBF4');
    gradient.addColorStop(0.9, '#97EBF4');
    gradient.addColorStop(1, '#C9F6FF');

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private async loadSprites(): Promise<void[]> {
    const sprites = ['hedgehog-sprite', 'ground-sprite'];
    return await Promise.all(sprites.map((sprite) => SpriteManager.load(sprite)));
  }

}