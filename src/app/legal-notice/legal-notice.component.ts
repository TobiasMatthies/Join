import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-legal-notice',
  templateUrl: './legal-notice.component.html',
  styleUrls: ['./legal-notice.component.css'],
})
export class LegalNoticeComponent {
  lastRoute: string;

  constructor(private router: Router) {
    if (this.router.getCurrentNavigation().previousNavigation) {
      this.lastRoute = this.router
        .getCurrentNavigation()
        .previousNavigation.finalUrl.toString();
    } else {
      this.lastRoute = '/legal-notice';
    }
  }
}
