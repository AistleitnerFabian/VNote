import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {
  items = ['1', '2', '3', '4', '5', '6'];

  constructor() {
  }

  ngOnInit(): void {
  }

}
