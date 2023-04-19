export function randomId(): string {
  let id = '';
  for (let i = 0; i < 8; i++) {
    const randomCharCode = Math.floor(Math.random() * (0xFFFF - 0x20) + 0x20);
    id += String.fromCharCode(randomCharCode);
  }

  return id;
}