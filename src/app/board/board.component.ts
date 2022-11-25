import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../app-state/app-state.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor(public appState: AppStateService) { }

  ngOnInit(): void {
  }

}
