export class Note {
  id: string;
  x: number;
  y: number;
  color: string;
  textImage: string;
  text: string;

  constructor(x, y, text) {
    this.x = x;
    this.y = y;
    this.text = text;
  }
}
