import {Component, OnInit} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-webapp',
  templateUrl: './webapp.component.html',
  styleUrls: ['./webapp.component.scss']
})
export class WebappComponent implements OnInit {
  private serverUrl = 'http://127.0.0.1:8080/socket';
  private title = 'WebSockets chat';
  topic: string = '/app';
  private stompClient;

  constructor() {
    this.initializeWebSocketConnection();
  }

  ngOnInit(): void {
  }

  initializeWebSocketConnection(): void {
    console.log('Initialize WebSocket Connection');
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    this.stompClient.debug = null
    const _this = this;
    _this.stompClient.connect({}, (frame) => {
      _this.stompClient.subscribe(_this.topic, (sdkEvent) => {
        _this.onMessageReceived(sdkEvent);
      });
      _this.stompClient.reconnect_delay = 2000;
    }, (error) => {
      console.log("errorCallBack -> " + error);
      setTimeout(() => {
        this.initializeWebSocketConnection();
      }, 5000);
    });
  }

  onMessageReceived(message) {
    console.log(message.body);
  }

}
