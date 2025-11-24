import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    standalone: true,
    imports: [RouterLink, RouterLinkActive, NgIf]
})
export class HeaderComponent {
  @Input() logoutOpened: boolean = false;
  @Output() logoutOpenedChanged = new EventEmitter<boolean>();

  constructor(private authService: AuthService) { }

  onLogout() {
    this.authService.logout();
  }

  toggleLogoutOpened() {
    this.logoutOpened = !this.logoutOpened;
    this.logoutOpenedChanged.emit(this.logoutOpened);
  }

}
