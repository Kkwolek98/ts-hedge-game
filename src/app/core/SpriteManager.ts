export class SpriteManager {
  // public static spritesDir: string = '/public'
  public static sprites: Map<string, SpriteData> = new Map();
  public static async load(name: string): Promise<void> {
    const [image, data] = await Promise.all(
      [getImage(name), getMetadata(name)]
    );

    SpriteManager.sprites.set(name, { image, metadata: data.meta, frames: data.frames });
  };
}

async function getMetadata(name: string): Promise<{ meta: SpriteMetadata, frames: Frame[] }> {
  const res = await fetch(`${name}.json`);
  if (res.status === 200) {
    const data = await res.json();
    const frames = Object.values(data.frames) as Frame[];
    return { meta: data.meta, frames };
  } else {
    throw Error(`Sprite metadata for ${name} not found`)
  }
}

function getImage(name: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject();
    img.src = `${name}.png`;
  });
}

export interface SpriteData {
  image: HTMLImageElement;
  metadata: SpriteMetadata
  frames: Frame[];
}

export interface SpriteMetadata {
  size: {
    w: number;
    h: number;
  };
  scale: string;
  frameTags: AnimationData[];
}

export interface AnimationData {
  name: string;
  from: number;
  to: number;
  direction: string;
}

export interface Frame {
  duration: number;
  frame: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  rotated: boolean;
  sourceSize: {
    w: number;
    h: number;
  };
  spriteSourceSize: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  trimmed: boolean;
}