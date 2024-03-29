import { Component, OnInit } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { AppStateService } from '../services/app-state.service';
import { Task } from '../models/tasks.model';
import { TaskDetailService } from '../services/task-detail.service';
import { AddTaskService } from '../services/add-task.service';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  filteredTasks: Task[] = [];

  constructor(
    public appStateService: AppStateService,
    public taskDetailService: TaskDetailService,
    public addTaskService: AddTaskService,
    private dataStorageService: DataStorageService
  ) {}

  async ngOnInit() {
    if (this.appStateService.tasks.length < 1) {
      this.appStateService.tasks = await this.dataStorageService.getItem(
        'tasks.json'
      );
    }

    this.filteredTasks = this.appStateService.tasks;
  }

  changeStatus(event: CdkDragDrop<any>, status: string) {
    let draggedTask;
    draggedTask = this.appStateService.tasks.find(
      (task) => task.id == +event.item.data
    );

    draggedTask['status'] = status;
  }

  onDrop(event: CdkDragDrop<any>, status: string) {
    if (event.previousContainer === event.container) {
      this.keepItem(event);
    } else {
      this.changeStatus(event, status);
      this.transferItem(event);
    }
  }

  keepItem(event: CdkDragDrop<any>) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  transferItem(event: CdkDragDrop<any>) {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  searchTasks() {
    let filter = document.getElementById('filter')['value'];

    if (!filter) {
      this.filteredTasks = this.appStateService.tasks;
    } else {
      this.filteredTasks = [
        ...this.appStateService.tasks.filter(
          (task) =>
            task.title.includes(filter) || task.description.includes(filter)
        ),
      ];
    }
  }
}
