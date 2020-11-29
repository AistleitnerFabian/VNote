import {Component, Input, OnInit} from '@angular/core';
import {User} from '../model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Input()
  user: User;

  @Input()
  retypedPassword;


  @Input()
  GTCChecked: boolean;

  constructor() {
  }

  ngOnInit(): void {
    this.user = new User();
  }

  register(): void {
    console.log(this.GTCChecked);
  }
}
