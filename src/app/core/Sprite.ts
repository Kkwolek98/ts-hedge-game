import { FrameData, SpriteData } from "./SpriteManager";

export class Sprite {
  private states: Map<string, FrameData> = new Map();
  private currentState: FrameData;
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

  public getCurrentFramePosition() {
    const frameWidth = 32 || this.data.metadata.size.w;
    const frameHeight = 32 || this.data.metadata.size.h;

    return {
      framePosition: [this.currentFrame * frameWidth, 0],
      frameDimensions: [frameWidth, frameHeight]
    }
  }

  public setState(state: string) {

  }
}