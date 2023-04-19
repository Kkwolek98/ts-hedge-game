import { GRAVITY } from "./settings";

const cached: { [key: number]: number } = {};
export function jumpVelocityByHeight(jumpHeight: number): number {
  if (cached[jumpHeight]) {
    return cached[jumpHeight];
  } else {
    const velocity = Math.sqrt(jumpHeight * GRAVITY * 2);
    cached[jumpHeight] = -velocity;
    return -velocity;
  }
}