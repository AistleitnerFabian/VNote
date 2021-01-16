import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../../service/http.service';
import {WebsocketService} from '../../service/websocket.service';
import {DataService} from '../../service/data.service';
import {Subscription} from 'rxjs';
import {Board} from '../../model/board';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit, OnDestroy {
  boards: Board[];
  displayedBoards: Board[];
  socketSubscription: Subscription;

  constructor(private httpService: HttpService, private websocketService: WebsocketService, private dataService: DataService) {
  }

  ngOnInit(): void {
    this.socketSubscription = this.httpService.getAllBoards(this.dataService.authenticatedUser.id)
      .subscribe(value => {
        this.boards = value;
        this.displayedBoards = value;
      });
    this.websocketService.websocketUpdate.addListener('updateBoards', () => {
      this.socketSubscription = this.httpService.getAllBoards(this.dataService.authenticatedUser.id)
        .subscribe(value => {
          this.boards = value;
          this.displayedBoards = value;
        });
    });
  }

  ngOnDestroy(): void {
    this.socketSubscription.unsubscribe();
  }

  filter(word: string): void {
    const newBoards = this.boards;
    const re = new RegExp(word.toLowerCase() + '.+$', 'i');
    this.displayedBoards = newBoards.filter(board => {
      console.log(board.boardName.toLowerCase().search(re) !== -1);
      return board.boardName.toLowerCase().search(re) !== -1;
    });
    console.log(this.displayedBoards);
  }
}
