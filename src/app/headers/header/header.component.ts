import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() logoutOpened: boolean = false;
  @Output() logoutOpenedChanged = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  toggleLogoutOpened() {
    this.logoutOpened = !this.logoutOpened;
    this.logoutOpenedChanged.emit(this.logoutOpened);
  }

}
