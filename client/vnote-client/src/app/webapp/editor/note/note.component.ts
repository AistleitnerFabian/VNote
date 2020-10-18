import {Component, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {trigger, style, animate, transition} from '@angular/animations';
import {ColorEvent} from 'ngx-color';
import {DragAndDropService} from "../drag-and-drop.service";

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
    )
  ]
})
export class NoteComponent implements OnInit {
  @ViewChild('dragHandle') dragHandler;
  posX = 200;
  posY = 200;
  menuExtended = false;
  lightColor = '#FFA500';
  darkColor = this.LightenDarkenColor(this.lightColor, -30);
  buttonColor = this.darkColor;
  locked = false;

  constructor(private dragAndDropService: DragAndDropService) {
  }

  ngOnInit(): void {
  }

  menuButtonPressed(element): void {
    console.log(element);
    if (this.menuExtended) {
      this.menuExtended = false;
      this.buttonColor = this.darkColor;
    } else {
      this.menuExtended = true;
      this.buttonColor = this.lightColor;
    }
  }

  lock(): void {
    this.locked = !this.locked;
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
  onMousemove(event: MouseEvent) {
    if (this.dragAndDropService.isDraging && this.dragHandler.nativeElement === this.dragAndDropService.dragHandler) {

      this.posX += (event.x - this.dragAndDropService.dragX) / this.dragAndDropService.scale;
      this.posY += (event.y - this.dragAndDropService.dragY) / this.dragAndDropService.scale;

      this.dragAndDropService.dragX = event.x;
      this.dragAndDropService.dragY = event.y;
    }
  }
}
