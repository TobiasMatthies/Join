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
    this.signUp(email, password);
    form.reset();
  }

  signUp(email: string, password: string) {
    this.authService.signup(email, password).subscribe(
      (resData) => {
        return;
      },
      (errorMessage) => {
        this.error = errorMessage;
      }
    );
  }

  resetErrorMessage() {
    this.error = null;
  }
}
