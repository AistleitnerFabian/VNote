import {Injectable} from '@angular/core';
import {User} from '../model/user';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  isEditorOpen = false;
  currentBoardName: BehaviorSubject<string> = new BehaviorSubject('New Board');
  authenticatedUser: User;

  constructor() {
  }
}
