import { GameObject } from "../core/GameObject";
import { KeyboardInput } from "../core/KeyboardInput";
import { SCROLL_POSITION } from "../core/settings";
import { SpriteManager } from "../core/SpriteManager";
import { GroundTile } from "./GroundTile";

export class Ground extends GameObject {
  private tileSize: { w: number, h: number };
  private groundTiles: GroundTile[] = [];
  private offscreenTiles: number = 10;
  private distanceSinceLastGeneration: number = 0;

  public height!: number;
  constructor() {
    super();
    this.tileSize = SpriteManager.sprites.get('ground-sprite')!.frames[0].sourceSize;
    this.initGround();
  }

  public update(): void {

    if (this.distanceSinceLastGeneration >= this.offscreenTiles * this.tileSize.w) {
      this.generateNewTiles();
      this.distanceSinceLastGeneration = 0;
    }


    if (this.game.player.position[0] > SCROLL_POSITION * this.game.canvas.width && KeyboardInput.isHeld('KeyD')) {
      this.distanceSinceLastGeneration += this.game.player.maxVelocityX;
      this.groundTiles.forEach((tile) => {
        tile.position[0] -= this.game.player.maxVelocityX;
      });
    }

    this.groundTiles.forEach((tile) => {
      tile.update();
    });
  }

  protected draw(): void {
  }

  private initGround(): void {
    const canvasWidth = this.game.canvas.width;
    const { w: tileWidth, h: tileHeight } = this.tileSize;
    const numberOfTiles = Math.ceil(canvasWidth / tileWidth) + this.offscreenTiles;

    this.height = tileHeight;

    for (let i = 0; i < numberOfTiles; i++) {
      this.groundTiles.push(new GroundTile([i * tileWidth, this.game.canvas.height - tileHeight]))
    }
  }

  private generateNewTiles(): void {
    this.groundTiles.splice(0, this.offscreenTiles);
    const { w: tileWidth, h: tileHeight } = this.tileSize;
    const lastTile = this.groundTiles.at(-1)!;

    for (let i = 1; i <= this.offscreenTiles; i++) {
      this.groundTiles.push(new GroundTile([lastTile.position[0] + i * tileWidth, this.game.canvas.height - tileHeight]));
    }
  }
}