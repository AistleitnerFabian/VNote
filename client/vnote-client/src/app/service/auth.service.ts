import {Injectable} from '@angular/core';
import {DataService} from './data.service';
import {CanActivate, Data, Router} from '@angular/router';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpService: HttpService, private dataService: DataService) {
  }

  isAuthenticated(): Observable<boolean> {
    return this.httpService.isAuthenticated();
  }
}
