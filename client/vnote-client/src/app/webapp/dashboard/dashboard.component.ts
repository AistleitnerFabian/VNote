import {Component, OnInit} from '@angular/core';
import {DataService} from '../../service/data.service';
import {HttpService} from "../../service/http.service";
import {Board} from "../../model/board";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private dataService: DataService, private httpService: HttpService) {
  }

  notifications = [];
  displayedBoards: Board[];

  getUsername() {
    try {
      return this.dataService.authenticatedUser.firstname;
    } catch (e) {
    }
  }

  ngOnInit(): void {
    this.httpService.getUserDataForId(this.dataService.authenticatedUser.id).subscribe(userData => {
      this.notifications = userData.notifications.filter((el) => {
        return el != null;
      });
      this.displayedBoards = userData.boards.filter((el) => {
        return el != null;
      });
    });
  }
}
