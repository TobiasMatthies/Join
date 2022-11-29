import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../app-state/app-state.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  currentDraggedElement: Task;

  constructor(public appState: AppStateService) {}

  ngOnInit(): void {}

  changeStatus(status: string) {
    this.currentDraggedElement['status'] = status;
    console.log('dropped');
  }
}
