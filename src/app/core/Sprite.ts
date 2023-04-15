import { Game } from "./Game";
import { AnimationData, Frame, SpriteData } from "./SpriteManager";

export class Sprite {
  private game: Game = Game.getInstance();
  private states: Map<string, AnimationData> = new Map();
  private currentState: AnimationData;
  private currentFrame: number = 0;
  private animationFrameTime!: number;

  // Time passed since last frame
  private timePassed: number = 0;

  public image: HTMLImageElement;
  constructor(
    private data: SpriteData,
    private readonly defaultState: string = 'idle',
    animationFps: number = 16
  ) {
    this.data.metadata.frameTags.forEach((tag) => {
      this.states.set(tag.name, tag);
    });

    this.currentState = this.states.get(this.defaultState)!;
    this.currentFrame = this.currentState.from;
    this.image = this.data.image;

    this.animationFrameTime = 1000 / animationFps;
  }

  public update() {
    this.timePassed += this.game.deltaTime;

    if (this.timePassed < this.animationFrameTime) return;

    if (this.currentFrame < this.currentState.to) {
      this.currentFrame++;
    } else {
      this.currentFrame = this.currentState.from;
    }

    this.timePassed = 0;
  }

  public getCurrentFrameData(): Frame {
    return this.data.frames[this.currentFrame];
  }

  public setState(state: string) {

  }
}