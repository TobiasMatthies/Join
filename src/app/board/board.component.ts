import { Component, OnInit } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { AppStateService } from '../app-state/app-state.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {

  constructor(public appState: AppStateService) {}

  ngOnInit(): void {}

  changeStatus(event: CdkDragDrop<any>, status: string) {
    let draggedTask;
    draggedTask = this.appState.tasks.find(
      (task) => task.id == +event.item.element.nativeElement.id
    );

    draggedTask['status'] = status;
    console.log('dropped');
  }

  onDrop(event: CdkDragDrop<any>, status: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      this.changeStatus(event, status);

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
