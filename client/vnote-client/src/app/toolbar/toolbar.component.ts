import {Component, HostListener, OnInit} from '@angular/core';
import {trigger, style, animate, transition} from '@angular/animations';
import {DataService} from "../service/data.service";
import {HttpService} from "../service/http.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({height: 0, opacity: 0}),
            animate('0.15s ease-out',
              style({height: 300, opacity: 1}))
          ]
        ),
        transition(
          ':leave',
          [
            style({height: 300, opacity: 1}),
            animate('0.15s ease-in',
              style({height: 0, opacity: 0}))
          ]
        )
      ]
    )
  ]
})
export class ToolbarComponent implements OnInit {
  username = '';
  isMenuOpened = false;

  constructor(private dataService: DataService, private httpService: HttpService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.dataService.authenticatedUser == null || this.dataService.authenticatedUser === undefined) {
      this.httpService.getUserDataForId(this.getCookie('userId')).subscribe(user => {
        this.dataService.authenticatedUser = user;
        this.username = this.dataService.authenticatedUser.lastname + ' ' + this.dataService.authenticatedUser.firstname;
      });
    } else {
      this.username = this.dataService.authenticatedUser.lastname + ' ' + this.dataService.authenticatedUser.firstname;
    }
  }

  @HostListener('document:mousedown', ['$event'])
  onClick(event): void {
    if (!event.target.matches('.dropdown-ignore')) {
      this.isMenuOpened = false;
    }
  }

  getCookie(name: string) {
    const ca: Array<string> = document.cookie.split(';');
    const caLen: number = ca.length;
    const cookieName = `${name}=`;
    let c: string;

    for (let i = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) === 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return '';
  }

  getBoardName(): string {
    return this.dataService.currentBoardName.getValue();
  }

  isEditor(): boolean {
    const url: string = this.router.url;
    return url.includes('app/editor');
  }

  setBoardName(boardName): void {
    this.dataService.currentBoardName.next(boardName);
  }
}
