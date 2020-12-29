import {Component, Input, OnInit} from '@angular/core';
import {User} from '../model/user';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {HttpService} from "../service/http.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Input()
  user: User = new User();
  @Input()
  retypedPassword = '';
  @Input()
  GTCChecked: boolean;

  registerForm = new FormGroup({
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    firstnameFormControl: new FormControl('', [
      Validators.required,
    ]),
    lastnameFormControl: new FormControl('', [
      Validators.required,
    ]),
    passwordFormControl: new FormControl('', [
      Validators.required,
    ]),
    retypedPasswordFormControl: new FormControl('', [
      Validators.required,
    ]),
    GTCFormControl: new FormControl('', [(control) => {
        return !control.value ? {required: true} : null;
      }]
    )
  });

  constructor(private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.user = new User();
  }

  register(): void {
    this.registerForm.get('GTCFormControl').markAsDirty();
    this.registerForm.markAllAsTouched();
    if (this.registerForm.valid) {
      if (this.retypedPassword === this.user.password) {
        this.httpService.registerUser(this.user).subscribe(value => {
          console.log(value);
        });
      }
    }
  }
}
