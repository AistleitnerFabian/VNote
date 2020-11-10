import {Component, OnInit} from '@angular/core';
import {WebsocketService} from './websocket.service';

@Component({
  selector: 'app-webapp',
  templateUrl: './webapp.component.html',
  styleUrls: ['./webapp.component.scss']
})
export class WebappComponent implements OnInit {

  constructor(private websocketService: WebsocketService) {
    this.websocketService.initializeWebSocketConnection();
  }

  ngOnInit(): void {
  }


}
