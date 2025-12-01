import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [RouterLink, RouterLinkActive],
})
export class NavbarComponent implements OnInit {
  user: User | null = null;

  constructor(
    public route: ActivatedRoute,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe((user) => (this.user = user));
  }
}
