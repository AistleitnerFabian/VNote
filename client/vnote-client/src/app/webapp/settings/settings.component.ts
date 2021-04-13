import {Component, OnInit} from '@angular/core';
import {DataService} from '../../service/data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(public dataService: DataService) {
  }

  ngOnInit(): void {
  }

}
