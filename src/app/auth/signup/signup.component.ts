import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  error: string = null;

  constructor(private authService: AuthService, public router: Router) {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    this.authService.signup(email, password).subscribe(
      (resData) => {
        console.log(resData);
      },
      (error) => {
        console.log(error);
        this.setErrorMessage(error);
      }
    );
    form.reset();
  }

  setErrorMessage(error) {
    switch (error.error.error.message) {
      case 'EMAIL_EXISTS':
        this.error = 'This email already exists!';
        break;
      case 'OPERATION_NOT_ALLOWED':
        this.error = 'Password sign-in is disabled';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        this.error =
          'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
    }
  }
}
