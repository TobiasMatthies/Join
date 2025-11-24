import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { ButtonPrimaryComponent } from '../../customComponents/button-primary/button-primary.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    imports: [
    ButtonPrimaryComponent,
    FormsModule
]
})
export class LoginComponent {
  error: string;
  emailError: boolean;
  passwordError: boolean;

  constructor(private authService: AuthService, public router: Router) {}

  onSubmit(form: NgForm) {

    const email = form.form.controls['email'];
    const password = form.form.controls['password'];

     if (!form.valid) {
      this.handleInputErrors(email, password);
       return;
     }

    this.authService.login(email.value, password.value).subscribe(
      (resData) => {},
      (error) => {
        this.error = error;
      }
    );
  }

  handleInputErrors(email, password) {
    if (email.invalid) {
      this.emailError = true;
    }
    if (password.invalid) {
      this.passwordError = true;
    }
  }

  resetErrors() {
    this.error = null;
    this.emailError = false;
    this.passwordError = false;
  }

  guestLogin() {
    this.authService.login('test@test.com', 'test1234').subscribe(
      (resData) => {},
      (error) => {
        this.error = error;
      }
    );
  }
}
