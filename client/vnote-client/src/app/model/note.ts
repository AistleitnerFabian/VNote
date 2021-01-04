import {TextDTO} from './text';

export class Note {
  id: string;
  boardId: string;
  x: number;
  y: number;
  color: string;
  text: TextDTO;
  notepadText: string;
}
