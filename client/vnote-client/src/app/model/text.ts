export class TextDTO {
  text: string;
  textImage: string;
  hasText: boolean;
  x;
  y;

  constructor() {
    this.text = '';
    this.textImage = '';
    this.hasText = false;
  }
}
