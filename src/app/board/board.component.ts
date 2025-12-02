import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

import { NgClass } from '@angular/common';
import { AddTaskOverlayComponent } from '../add-task/add-task-overlay/add-task-overlay.component';
import { ButtonPrimaryComponent } from '../customComponents/button-primary/button-primary.component';
import { LayoutComponent } from '../layout/layout.component';
import { Task } from '../models/tasks.model';
import { AddTaskService } from '../services/add-task.service';
import { AppStateService } from '../services/app-state.service';
import { DataStorageService } from '../services/data-storage.service';
import { TaskDetailService } from '../services/task-detail.service';
import { BoardColumnComponent } from './board-column/board-column.component';
import { FilterTasksPipe } from './filter-tasks.pipe';
import { TaskDetailEditComponent } from './task-detail-edit/task-detail-edit.component';
import { TaskDetailInfoComponent } from './task-detail-info/task-detail-info.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  imports: [
    LayoutComponent,
    ButtonPrimaryComponent,
    DragDropModule,
    NgClass,
    BoardColumnComponent,
    AddTaskOverlayComponent,
    TaskDetailInfoComponent,
    TaskDetailEditComponent,
    FilterTasksPipe,
  ],
})
export class BoardComponent implements OnInit {
  filteredTasks: Task[] = [];
  columns = [
    {
      title: 'Triage',
      status: 'triage',
      id: 'triageList',
      connectedTo: [
        'todoList',
        'inProgressList',
        'awaitingFeedbackList',
        'doneList',
      ],
    },
    {
      title: 'To do',
      status: 'toDo',
      id: 'todoList',
      connectedTo: [
        'triageList',
        'inProgressList',
        'awaitingFeedbackList',
        'doneList',
      ],
    },
    {
      title: 'In Progress',
      status: 'inProgress',
      id: 'inProgressList',
      connectedTo: [
        'triageList',
        'todoList',
        'awaitingFeedbackList',
        'doneList',
      ],
    },
    {
      title: 'Awaiting feedback',
      status: 'awaitingFeedback',
      id: 'awaitingFeedbackList',
      connectedTo: ['triageList', 'todoList', 'inProgressList', 'doneList'],
    },
    {
      title: 'Done',
      status: 'done',
      id: 'doneList',
      connectedTo: [
        'triageList',
        'todoList',
        'inProgressList',
        'awaitingFeedbackList',
      ],
    },
  ];

  constructor(
    public appStateService: AppStateService,
    public taskDetailService: TaskDetailService,
    public addTaskService: AddTaskService,
    private dataStorageService: DataStorageService,
  ) {}

  async ngOnInit() {
    if (this.appStateService.tasks.length < 1) {
      this.appStateService.tasks =
        await this.dataStorageService.getItem('tasks.json');
    }

    this.filteredTasks = this.appStateService.tasks;
  }

  changeStatus(event: CdkDragDrop<any>, status: string) {
    let draggedTask;
    draggedTask = this.appStateService.tasks.find(
      (task) => task.id == +event.item.data,
    );

    draggedTask['status'] = status;
    this.dataStorageService.setItem(this.appStateService.tasks, 'tasks.json');
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
      event.currentIndex,
    );
  }

  transferItem(event: CdkDragDrop<any>) {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
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
            task.title.includes(filter) || task.description.includes(filter),
        ),
      ];
    }
  }
}
