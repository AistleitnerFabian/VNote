import {TextDTO} from './text';

export class Note {
  id: string;
  x: number;
  y: number;
  color: string;
  text: TextDTO;

  constructor(x, y, text) {
    this.x = x;
    this.y = y;
    this.text = text;
  }
}
