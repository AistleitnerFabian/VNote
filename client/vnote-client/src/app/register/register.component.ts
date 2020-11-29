import {Component, Input, OnInit} from '@angular/core';
import {User} from '../model/user';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  firstnameFormControl = new FormControl('', [
    Validators.required,
  ]);
  lastnameFormControl = new FormControl('', [
    Validators.required,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);
  retypedPasswordFormControl = new FormControl('', [
    Validators.required,
  ]);
  GTCFormControl = new FormControl('', [(control) => {
      return !control.value ? {required: true} : null;
    }]
  );

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
    this.GTCFormControl.markAsDirty();
    console.log(this.GTCChecked);
  }
}
