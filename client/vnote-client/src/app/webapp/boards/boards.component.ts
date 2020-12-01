import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../../service/http.service';
import {WebsocketService} from '../../service/websocket.service';
import {DataService} from '../../service/data.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit, OnDestroy {
  boards;
  socketSubscription: Subscription;

  constructor(private httpService: HttpService, private websocketService: WebsocketService, private dataService: DataService) {
  }

  ngOnInit(): void {
    this.socketSubscription = this.httpService.getAllBoards().subscribe(value => this.boards = value);
    this.websocketService.websocketUpdate.addListener('updateBoards', () => {
      this.socketSubscription = this.httpService.getAllBoards().subscribe(value => this.boards = value);
    });
  }

  ngOnDestroy(): void {
    this.socketSubscription.unsubscribe();
  }
}
