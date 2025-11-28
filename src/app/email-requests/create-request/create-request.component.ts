import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonPrimaryComponent } from '../../customComponents/button-primary/button-primary.component';
import { HeaderComponent } from '../../headers/header/header.component';

@Component({
  selector: 'app-create-request',
  imports: [HeaderComponent, RouterModule, ButtonPrimaryComponent],
  templateUrl: './create-request.component.html',
  styleUrl: './create-request.component.css',
})
export class CreateRequestComponent {}
