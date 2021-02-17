import {Component, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {trigger, style, animate, transition} from '@angular/animations';
import {ColorEvent} from 'ngx-color';
import {DragAndDropService} from '../drag-and-drop.service';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {Note} from '../../../model/note';
import {HttpService} from '../../../service/http.service';
import {WebsocketService} from "../../../service/websocket.service";

@Component({
  selector: 'note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
  animations: [
    trigger(
      'extendMenu',
      [
        transition(
          ':enter', [
            style({transform: 'translateY(100%)', opacity: 0, 'z-index': -1}),
            animate('150ms', style({transform: 'translateY(0)', opacity: 1, 'z-index': -1}))
          ]
        ),
        transition(
          ':leave', [
            style({transform: 'translateY(0)', opacity: 1, 'z-index': -1}),
            animate('150ms', style({transform: 'translateY(100%)', opacity: 0, 'z-index': -1})),

          ]
        )]
    ),
    trigger(
      'extendNotepad',
      [
        transition(
          ':enter', [
            style({transform: 'translateX(-100%)', opacity: 0, 'z-index': -1}),
            animate('150ms', style({transform: 'translateX(0)', opacity: 1, 'z-index': -1}))
          ]
        ),
        transition(
          ':leave', [
            style({transform: 'translateX(0)', opacity: 1, 'z-index': -1}),
            animate('150ms', style({transform: 'translateX(-100%)', opacity: 0, 'z-index': -1})),

          ]
        )]
    )
  ]
})
export class NoteComponent implements OnInit {
  // Color Map
  colorMap = new Map([
    ['cRED', '#FF6962'],
    ['cORANGE', '#F99853'],
    ['cYELLOW', '#F8D568'],
    ['cGREEN', '#8FE381'],
    ['cAQUA', '#C5ECE3'],
    ['cBLUE', '#AAE5EF'],
    ['cPURPLE', '#B19CD8'],
    ['cPINK', '#F17FC5']
  ]);

  @ViewChild('dragHandle') dragHandler;
  @ViewChild('contenttext') contenttext;
  @Input() note: Note;
  menuExtended = false;
  notepadExtended = false;
  lightColor = '#FFA500';
  darkColor = this.LightenDarkenColor(this.lightColor, -30);
  buttonColor = this.darkColor;
  locked = false;
  showText = false;
  htmlContent: any;
  notePosChanged: boolean = false;
  changeId: string;
  editable: boolean = false;

  constructor(private dragAndDropService: DragAndDropService, private httpService: HttpService, private websocketService: WebsocketService) {
  }

  ngOnInit(): void {
    this.setColor();
    this.websocketService.noteUpdate.subscribe(value => this.updateNote(value));
  }

  setColor(): void {
    this.changeId = this.getChangeId(32);
    this.lightColor = this.colorMap.get(this.note.color);
    this.darkColor = this.LightenDarkenColor(this.lightColor, -30);
    this.buttonColor = this.darkColor;
  }

  updateNote(noteId: string): void {
    if (this.note.id === noteId.split(';')[0] && this.changeId !== noteId.split(';')[1]) {
      this.httpService.getNoteById(this.note.id).subscribe(value => {
        this.note = value;
        this.setColor();
      });
    }
  }

  menuButtonPressed(element): void {
    console.log(element);
    if (this.menuExtended) {
      this.menuExtended = false;
      this.notepadExtended = false;
      this.buttonColor = this.darkColor;
    } else {
      this.menuExtended = true;
      this.buttonColor = this.lightColor;
    }
  }

  lock(): void {
    this.locked = !this.locked;
  }

  edit(): void {
    this.showText = true;
    this.editable = !this.editable;
  }

  handleChange($event: ColorEvent): void {
    this.lightColor = $event.color.hex;
    this.darkColor = this.LightenDarkenColor(this.lightColor, -30);
    this.buttonColor = this.lightColor;
    this.note.color = this.getKeyByValue(this.lightColor);
    this.noteChanged();
  }

  getKeyByValue(value): string {
    return Array.from(this.colorMap.keys()).find(key => {
      return this.colorMap.get(key).toLowerCase() === value.toLowerCase();
    });
  }

  LightenDarkenColor(col, amt): string {
    let usePound = false;

    if (col[0] === '#') {
      col = col.slice(1);
      usePound = true;
    }
    const num = parseInt(col, 16);
    let r = (num >> 16) + amt;

    if (r > 255) {
      r = 255;
    } else if (r < 0) {
      r = 0;
    }

    let b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) {
      b = 255;
    } else if (b < 0) {
      b = 0;
    }
    let g = (num & 0x0000FF) + amt;
    if (g > 255) {
      g = 255;
    } else if (g < 0) {
      g = 0;
    }

    if ((usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16) === '#0') {
      return '#000000';
    }
    return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
  }

  @HostListener('document:mousemove', ['$event'])
  onMousemove(event: MouseEvent): void {
    if (!this.locked && this.dragAndDropService.isDraging && this.dragHandler.nativeElement === this.dragAndDropService.dragHandler) {

      this.note.x += (event.x - this.dragAndDropService.dragX) / this.dragAndDropService.scale;
      this.note.y += (event.y - this.dragAndDropService.dragY) / this.dragAndDropService.scale;

      this.dragAndDropService.dragX = event.x;
      this.dragAndDropService.dragY = event.y;

      this.notePosChanged = true;
    }
  }

  @HostListener('document:mouseup')
  onMouseup(event: MouseEvent): void {
    if (this.notePosChanged) {
      this.noteChanged();
      this.notePosChanged = false;
    }
  }

  changeShowText(): void {
    this.showText = !this.showText;
    if (!this.showText) {
      this.editable = false;
    }
  }

  changeNotepad(): void {
    this.notepadExtended = !this.notepadExtended;
  }

  noteChanged(): void {
    this.httpService.updateNote(this.note, this.changeId).subscribe();
  }

  getColorPallete(): string[] {
    return Array.from(this.colorMap.values());
  }

  getChangeId(length): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  delete(): void {
    this.httpService.deleteNote(this.note, this.changeId).subscribe();
    this.note = null;
  }
}
