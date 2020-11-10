import {Component, HostListener, OnInit} from '@angular/core';
import {trigger, style, animate, transition} from '@angular/animations';
import {DataService} from "../webapp/data.service";

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
  username = 'Max Muster';
  isMenuOpened = false;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
  }

  @HostListener('document:mousedown', ['$event'])
  onClick(event): void {
    if (!event.target.matches('.dropdown-ignore')) {
      this.isMenuOpened = false;
    }
  }
}
