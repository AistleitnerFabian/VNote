import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Board} from '../model/board';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {Note} from '../model/note';
import {DataService} from './data.service';
import {ImageDataDTO} from '../model/imageDataDTO';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  URL = 'http://localhost:4200/api';

  constructor(private http: HttpClient) {
  }

  getAllBoards(uid: string): Observable<Board[]> {
    return this.http.get<Board[]>(this.URL + '/findBoardsByUserId/' + uid);
  }

  getBoardById(bid): Observable<Board> {
    return this.http.get<Board>(this.URL + '/findBoardById/' + bid);
  }

  getNotesByBoardId(bid): Observable<Note[]> {
    return this.http.get<Note[]>(this.URL + '/findNotesByBoardId/' + bid);
  }

  registerUser(user: User): Observable<any> {
    return this.http.post<any>(this.URL + '/register', user);
  }

  login(user: User): Observable<User> {
    return this.http.post<User>(this.URL + '/login', user);
  }

  isAuthenticated(): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.get<boolean>(this.URL + '/isAuthenticated', httpOptions);
  }

  getUserDataForId(userId: string): Observable<User> {
    return this.http.post<User>(this.URL + '/getUserDataForId', userId);
  }

  updateNote(note: Note, changeId: string): Observable<Note> {
    return this.http.put<Note>(this.URL + '/updateNote/' + changeId, note);
  }

  deleteNote(note: Note, changeId: string): Observable<Note> {
    return this.http.post<Note>(this.URL + '/deleteNote/' + changeId, note);
  }

  updateBoard(board: Board): Observable<Board> {
    return this.http.put<Board>(this.URL + '/updateBoard', board);
  }

  updateLatestBoard(userId: string, boardId: string): Observable<Board> {
    return this.http.post<Board>(this.URL + '/updateLatest', userId + ';' + boardId);
  }

  getNoteById(noteId: string): Observable<Note> {
    return this.http.get<Note>(this.URL + '/getNoteById/' + noteId);
  }

  uploadImage(imageDataDTO: ImageDataDTO): Observable<ImageDataDTO> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.post<ImageDataDTO>(this.URL + '/uploadImageWeb', imageDataDTO, httpOptions);
  }
}
