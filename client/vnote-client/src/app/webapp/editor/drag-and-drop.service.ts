import {HostListener, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DragAndDropService {

  isDraging: boolean = false;
  dragX = 0;
  dragY = 0;
  dragHandler: HTMLElement;
  scale = 1;
  panZoomAPI;

  constructor() {
  }


}
