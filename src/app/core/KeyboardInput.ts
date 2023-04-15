export class KeyboardInput {
  public static listen(): void {
    window.addEventListener('keydown', (e) => {
      KeyboardInput.heldKeys.add(e.code.toUpperCase());
    });

    window.addEventListener('keyup', (e) => {
      KeyboardInput.heldKeys.delete(e.code.toUpperCase());
    });

  }

  public static isHeld(key: string): boolean {
    return KeyboardInput.heldKeys.has(key.toUpperCase());
  }

  private static heldKeys: Set<string> = new Set();
}