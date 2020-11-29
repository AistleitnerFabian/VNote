import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Board} from '../model/board';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  getAllBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(this.URL + '/findAllBoards');
  }

  getBoardById(bid): Observable<Board> {
    return this.http.get<Board>(this.URL + '/findBoardById/' + bid);
  }
}
