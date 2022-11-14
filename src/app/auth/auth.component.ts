import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authMode = 'login';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.router.navigate(['/summary']);
  }

  switchAuthMode(mode: string) {
    this.authMode = mode;
  }

}
