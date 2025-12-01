import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonPrimaryComponent } from '../../customComponents/button-primary/button-primary.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [FormsModule, ButtonPrimaryComponent, RouterModule],
})
export class SignupComponent {
  error: string;
  nameError: boolean;
  emailError: boolean;
  passwordError: boolean;

  constructor(
    private authService: AuthService,
    public router: Router,
  ) {}

  onSubmit(form: NgForm) {
    const username = form.form.controls['name'];
    const email = form.form.controls['email'];
    const password = form.form.controls['password'];

    if (!form.valid) {
      this.handleInputErrors(username, email, password);
      return;
    }

    this.signUp(email.value, password.value, username.value);
    form.reset();
  }

  handleInputErrors(username, email, password) {
    if (username.invalid) {
      this.nameError = true;
    }
    if (email.invalid) {
      this.emailError = true;
    }
    if (password.invalid) {
      this.passwordError = true;
    }
  }

  signUp(email: string, password: string, username: string) {
    this.authService.signup(email, password, username).subscribe(
      (resData) => {
        return;
      },
      (errorMessage) => {
        this.error = errorMessage;
      },
    );
  }

  resetErrors() {
    this.error = null;
    this.nameError = false;
    this.emailError = false;
    this.passwordError = false;
  }
}
