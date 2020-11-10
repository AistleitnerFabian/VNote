import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  isEditorOpen = false;
  displayedText = '';

  constructor() {
  }
}
