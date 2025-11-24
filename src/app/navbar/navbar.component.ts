import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    imports: [RouterLink, RouterLinkActive]
})
export class NavbarComponent implements OnInit {

  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
