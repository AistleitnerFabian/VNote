import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    passwordFormControl: new FormControl('', [
      Validators.required,
    ]),
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email,
    ])
  });

  constructor() {
  }

  ngOnInit(): void {
  }

  login(): void {
    if (this.loginForm.valid) {
      alert('login');
    }
  }
}
