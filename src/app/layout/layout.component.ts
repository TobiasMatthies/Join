import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  logoutOpened: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  closeLogoutOpened() {
    this.logoutOpened = false;
  }

  setLogoutOpened(value: boolean) {
    this.logoutOpened = value;
  }
}
