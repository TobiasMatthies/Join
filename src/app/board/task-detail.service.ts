import { Injectable } from '@angular/core';
import { Task } from '../models/tasks.model';

@Injectable({
  providedIn: 'root',
})
export class TaskDetailService {
  openedTaskDetailView: Task;
  editMode: boolean = false;
  constructor() {}

  openTaskDetailView(task) {
    this.openedTaskDetailView = task;
  }

  closeTaskDetailView() {
    this.openedTaskDetailView = null;
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }
}
