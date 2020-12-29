import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../service/data.service";
import {HttpService} from "../service/http.service";
import {User} from "../model/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input()
  user: User = new User();

  loginForm = new FormGroup({
    passwordFormControl: new FormControl('', [
      Validators.required,
    ]),
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email,
    ])
  });

  constructor(private dataService: DataService, private httpService: HttpService, private router: Router) {
  }

  ngOnInit(): void {
  }

  login(): void {
    if (this.loginForm.valid) {
      this.httpService.login(this.user).subscribe(user => {
        if (user != null) {
          console.log(user);
          this.dataService.authenticatedUser = user;
          //this.router.navigate(['app']);
        }
      });
    }
  }
}
