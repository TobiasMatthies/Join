import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonPrimaryComponent } from '../../customComponents/button-primary/button-primary.component';

@Component({
  selector: 'app-welcome',
  imports: [RouterModule, ButtonPrimaryComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent {
  constructor(public router: Router) {}
}
