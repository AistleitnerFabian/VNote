import {Component, OnInit} from '@angular/core';
import {DataService} from '../../service/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private dataService: DataService) {
  }

  getUsername() {
    try {
      return this.dataService.authenticatedUser.firstname;
    } catch (e) {
    }
  }

  ngOnInit(): void {
  }
}
