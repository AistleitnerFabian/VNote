import {TextDTO} from './text';

export class Note {
  id: string;
  boardId: string;
  x: number;
  y: number;
  color: string;
  text: TextDTO;
  notepadText: string;

  constructor(boardId: string, x: number, y: number, color: string) {
    this.boardId = boardId;
    this.x = x;
    this.y = y;
    this.color = color;
    this.text = new TextDTO();
    this.notepadText = '';
  }
}
