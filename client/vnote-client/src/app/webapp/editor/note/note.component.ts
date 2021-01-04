import {Component, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {trigger, style, animate, transition} from '@angular/animations';
import {ColorEvent} from 'ngx-color';
import {DragAndDropService} from '../drag-and-drop.service';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {Note} from '../../../model/note';

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
  colorMap = {
    cRED: '#FF6962',
    cORANGE: '#F99853',
    cYELLOW: '#F8D568',
    cGREEN: '#8FE381',
    cAQUA: '#C5ECE3',
    cBLUE: '#AAE5EF',
    cPURPLE: '#B19CD8',
    cPINK: '#F17FC5'
  };
  colors = ['#FF6962', '#F99853', '#F8D568', '#8FE381', '#C5ECE3', '#AAE5EF', '#B19CD8', '#F17FC5']

  @ViewChild('dragHandle') dragHandler;
  @Input() note: Note;
  menuExtended = false;
  notepadExtended = false;
  lightColor = '#FFA500';
  darkColor = this.LightenDarkenColor(this.lightColor, -30);
  buttonColor = this.darkColor;
  locked = false;
  showText = false;
  htmlContent: any;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    sanitize: true,
    toolbarHiddenButtons: [
      [
        'undo',
        'redo',
        'strikeThrough',
        'subscript',
        'superscript',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'indent',
        'outdent',
        'insertUnorderedList',
        'insertOrderedList',
        'heading',
        'fontName'
      ],
      [
        'fontSize',
        'textColor',
        'backgroundColor',
        'customClasses',
        'link',
        'unlink',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode'
      ]
    ]
  };

  constructor(private dragAndDropService: DragAndDropService) {
  }

  ngOnInit(): void {
    this.lightColor = this.colorMap[this.note.color];
    this.darkColor = this.LightenDarkenColor(this.lightColor, -30);
    this.buttonColor = this.darkColor;
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
  }

  handleChange($event: ColorEvent): void {
    this.lightColor = $event.color.hex;
    this.darkColor = this.LightenDarkenColor(this.lightColor, -30);
    this.buttonColor = this.lightColor;
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
    }
  }

  changeShowText(): void {
    this.showText = !this.showText;
  }

  changeNotepad(): void {
    this.notepadExtended = !this.notepadExtended;
  }
}
