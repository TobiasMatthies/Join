import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WindowWidthService } from './window-width.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  logoutOpened: boolean = false;

  constructor(public windowWidthService: WindowWidthService) {}

  ngOnInit(): void {
   
  }

  closeLogoutOpened() {
    this.logoutOpened = false;
  }

  setLogoutOpened(value: boolean) {
    this.logoutOpened = value;
  }
}
