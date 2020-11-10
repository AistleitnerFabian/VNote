import {Component, Input, OnInit} from '@angular/core';
import {Note} from '../../model/note';
import {Board} from '../../model/board';
import {Router} from '@angular/router';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input() board: Board;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.ellipsizeTextBox();
  }

  ellipsizeTextBox(): void {
    let el = document.getElementById('desc');
    let wordArray = el.innerHTML.split(' ');
    while (el.scrollHeight > el.offsetHeight) {
      wordArray.pop();
      el.innerHTML = wordArray.join(' ') + '...';
    }
  }

  openBoard(): void {
    this.router.navigateByUrl('app/editor/' + this.board.id);
  }
}
