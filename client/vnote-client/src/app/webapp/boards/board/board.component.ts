import {Component, Input, OnInit} from '@angular/core';
import {Note} from '../../../model/note';
import {Board} from '../../../model/board';
import {Router} from '@angular/router';
import {HttpService} from '../../../service/http.service';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input() board: Board;

  username: string;

  constructor(private router: Router, private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.ellipsizeTextBox();
    this.httpService.getUserDataForId(this.board.userId).subscribe(user => {
      this.username = user.firstname + ' ' + user.lastname;
    });
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

  getContributors() {
    if (this.board.contributors != null) {
      return this.board.contributors.length;
    }
    return 0;
  }
}
