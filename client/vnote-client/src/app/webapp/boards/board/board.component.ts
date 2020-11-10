import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    this.ellipsizeTextBox();
  }

  ellipsizeTextBox() {
    var el = document.getElementById('desc');
    var wordArray = el.innerHTML.split(' ');
    while (el.scrollHeight > el.offsetHeight) {
      wordArray.pop();
      el.innerHTML = wordArray.join(' ') + '...';
    }
  }
}
