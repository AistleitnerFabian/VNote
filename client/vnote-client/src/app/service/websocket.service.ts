import {Injectable} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {EventEmitter} from "events";
import {BehaviorSubject, Subscription} from "rxjs";
import {DataService} from "./data.service";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private serverUrl = 'http://localhost:4200/socket';
  topic: string = '/app';
  private boardSubscription: Subscription;
  private stompClient;
  public websocketUpdate: EventEmitter = new EventEmitter();
  public noteUpdate: BehaviorSubject<string> = new BehaviorSubject('');


  constructor(private dataService: DataService) {
  }

  initializeWebSocketConnection(): void {
    console.log('Initialize WebSocket Connection');
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    this.stompClient.debug = null;
    const _this = this;
    _this.stompClient.connect({}, (frame) => {
      _this.stompClient.subscribe(_this.topic, (sdkEvent) => {
        _this.onMessageReceived(sdkEvent);
      });
      _this.stompClient.reconnect_delay = 2000;
    }, (error) => {
      console.log('errorCallBack -> ' + error);
      setTimeout(() => {
        this.initializeWebSocketConnection();
      }, 5000);
    });
  }

  getBoardChanges(boardId: string): void {
    console.log('Initialize WebSocket Connection Editor');
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    this.stompClient.debug = null;
    const _this = this;
    _this.stompClient.connect({}, (frame) => {
      _this.stompClient.subscribe(_this.topic, (sdkEvent) => {
        _this.onMessageReceived(sdkEvent);
      });
      _this.boardSubscription = _this.stompClient.subscribe('/' + boardId, (sdkEvent) => {
        this.onNoteChanged(sdkEvent);
      });
      _this.stompClient.reconnect_delay = 2000;
    }, (error) => {
      console.log('errorCallBack -> ' + error);
      setTimeout(() => {
        this.getBoardChanges(boardId);
      }, 5000);
    });
  }

  unsubscribeBoardChanges(): void {
    this.boardSubscription.unsubscribe();
  }

  onNoteChanged(message): void {
    console.log(message);
    this.noteUpdate.next(message.body);
  }

  onMessageReceived(message): void {
    this.websocketUpdate.emit('updateBoards');
  }

}
