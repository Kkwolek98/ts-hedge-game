export class SpriteManager {
  // public static spritesDir: string = '/public'
  public static sprites: Map<string, SpriteData> = new Map();
  public static async load(name: string): Promise<void> {
    const [image, metadata] = await Promise.all(
      [getImage(name), getMetadata(name)]
    );

    SpriteManager.sprites.set(name, { image, metadata });
  };
}

async function getMetadata(name: string): Promise<SpriteMetadata> {
  const res = await fetch(`${name}.json`);
  if (res.status === 200) {
    const data: SpriteMetadata = (await res.json()).meta;
    return data;
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
}

export interface SpriteMetadata {
  size: {
    w: number;
    h: number;
  };
  scale: string;
  frameTags: FrameData[];
}

export interface FrameData {
  name: string;
  from: number;
  to: number;
  direction: string;
}