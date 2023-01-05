import { Injectable } from '@angular/core';
import { AppStateService } from '../services/app-state.service';
import { Task } from '../models/tasks.model';

@Injectable({
  providedIn: 'root',
})
export class TaskDetailService {
  openedTaskDetailView: Task;
  editMode: boolean = false;
  constructor(private appStateService: AppStateService) {}

  openTaskDetailView(task: Task) {
    this.openedTaskDetailView = task;
  }

  closeTaskDetailView() {
    this.openedTaskDetailView = null;
    this.editMode = false;
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  toggleSubtask(index: number) {
    this.openedTaskDetailView.subtasks[index].completed =
      !this.openedTaskDetailView.subtasks[index].completed;
  }
}
