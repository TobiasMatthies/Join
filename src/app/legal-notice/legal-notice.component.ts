import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';

@Component({
    selector: 'app-legal-notice',
    templateUrl: './legal-notice.component.html',
    styleUrls: ['./legal-notice.component.css'],
    imports: [LayoutComponent, RouterLink]
})
export class LegalNoticeComponent {
  lastRoute: string;

  constructor(private router: Router) {
    if (this.router.currentNavigation().previousNavigation) {
      this.lastRoute = this.router
        .currentNavigation()
        .previousNavigation.finalUrl.toString();
    } else {
      this.lastRoute = '/summary';
    }
  }
}
