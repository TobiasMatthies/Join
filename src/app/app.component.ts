import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { AsyncPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ThemeToggleComponent } from './customComponents/theme-toggle/theme-toggle.component';
import { ThemeService } from './services/theme.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [RouterOutlet, AsyncPipe, ThemeToggleComponent]
})
export class AppComponent implements OnInit {
  title = 'join';

  // ThemeService is injected so the stored theme is applied on startup
  constructor(public authService: AuthService, private themeService: ThemeService) {}

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
