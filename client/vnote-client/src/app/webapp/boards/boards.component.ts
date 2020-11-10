import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../http.service';
import {WebsocketService} from "../websocket.service";

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {
  boards;

  constructor(private httpService: HttpService, private websocketService: WebsocketService) {
  }

  ngOnInit(): void {
    this.httpService.getAllBoards().subscribe(value => this.boards = value);
    this.websocketService.websocketUpdate.addListener('updateBoards', () => {
      this.httpService.getAllBoards().subscribe(value => this.boards = value);
    });
  }

}
