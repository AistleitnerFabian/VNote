import {Injectable} from '@angular/core';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  isEditorOpen = false;
  displayedText = '';
  authenticatedUser: User;

  constructor() {
  }
}
