import {Component, OnInit} from '@angular/core';
import {WebsocketService} from '../service/websocket.service';
import {DataService} from '../service/data.service';

@Component({
  selector: 'app-webapp',
  templateUrl: './webapp.component.html',
  styleUrls: ['./webapp.component.scss']
})
export class WebappComponent implements OnInit {

  constructor(private websocketService: WebsocketService, public dataService: DataService) {
    this.websocketService.initializeWebSocketConnection();
  }

  ngOnInit(): void {
  }


}
