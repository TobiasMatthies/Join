import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { ButtonPrimaryComponent } from '../../customComponents/button-primary/button-primary.component';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css'],
    standalone: true,
    imports: [FormsModule, ButtonPrimaryComponent, NgIf]
})
export class ForgotPasswordComponent {
   showWarning: boolean;

   constructor(public router: Router) {}

}
