import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WindowWidthService } from './window-width.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { AddTaskResponsiveHeaderComponent } from '../headers/add-task-responsive-header/add-task-responsive-header.component';
import { HeaderComponent } from '../headers/header/header.component';


@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css'],
    imports: [
    HeaderComponent,
    AddTaskResponsiveHeaderComponent,
    NavbarComponent
]
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
