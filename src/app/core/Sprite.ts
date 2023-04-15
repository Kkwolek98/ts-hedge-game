import { AnimationData, Frame, SpriteData } from "./SpriteManager";

export class Sprite {
  private states: Map<string, AnimationData> = new Map();
  private currentState: AnimationData;
  private currentFrame: number = 0;

  public image: HTMLImageElement;
  constructor(private data: SpriteData, private readonly defaultState = 'idle') {
    this.data.metadata.frameTags.forEach((tag) => {
      this.states.set(tag.name, tag);
    });

    this.currentState = this.states.get(this.defaultState)!;
    this.currentFrame = this.currentState.from;
    this.image = this.data.image;

  }

  public update() {
    if (this.currentFrame < this.currentState.to) {
      this.currentFrame++;
    } else {
      this.currentFrame = this.currentState.from;
    }
  }

  public getCurrentFrameData(): Frame {
    return this.data.frames[this.currentFrame];
  }

  public setState(state: string) {

  }
}