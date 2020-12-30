import {Injectable} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {EventEmitter} from "events";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private serverUrl = 'http://localhost:4200/socket';
  topic: string = '/app';
  private stompClient;
  public websocketUpdate: EventEmitter = new EventEmitter();

  constructor() {
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


  onMessageReceived(message) {
    console.log(message.body);
    this.websocketUpdate.emit('updateBoards');
  }
}
