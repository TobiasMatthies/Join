import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskDetailService {
  openedTaskDetailView: Task;
  constructor() {}

  openTaskDetailView(task) {
    this.openedTaskDetailView = task;
  }

  closeTaskDetailView() {
    this.openedTaskDetailView = null;
  }

  editTask() {}
}
