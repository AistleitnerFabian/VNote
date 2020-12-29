import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Board} from '../model/board';
import {Observable} from 'rxjs';
import {User} from "../model/user";

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

  registerUser(user: User): Observable<any> {
    return this.http.post<any>(this.URL + '/register', user);
  }

  login(user: User): Observable<User> {
    /*
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true',
      }), withCredentials: true
    };
    */
    return this.http.post<User>(this.URL + '/login', user);
  }

  isAuthenticated(): Observable<boolean> {
    return this.http.get<boolean>(this.URL + '/isAuthenticated');
  }
}
