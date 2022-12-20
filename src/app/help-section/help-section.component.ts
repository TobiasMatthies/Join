import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-help-section',
  templateUrl: './help-section.component.html',
  styleUrls: ['./help-section.component.css'],
})
export class HelpSectionComponent {
  lastRoute: string;

  constructor(private router: Router) {
    if (this.router.getCurrentNavigation().previousNavigation) {
      this.lastRoute = this.router
        .getCurrentNavigation()
        .previousNavigation.finalUrl.toString();
    } else {
      this.lastRoute = '/summary';
    }
  }
}
