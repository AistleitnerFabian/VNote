import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Board} from '../model/board';
import {Observable} from 'rxjs';
import {User} from "../model/user";
import {Note} from "../model/note";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  URL = 'http://localhost:4200/api';

  constructor(private http: HttpClient) {
  }

  getAllBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(this.URL + '/findAllBoards');
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
    return this.http.get<boolean>(this.URL + '/isAuthenticated');
  }

  getUserDataForId(userId: string): Observable<User> {
    return this.http.post<User>(this.URL + '/getUserDataForId', userId);
  }
}
