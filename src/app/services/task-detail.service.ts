import { Injectable } from '@angular/core';
import { AppStateService } from './app-state.service';
import { Task } from '../models/tasks.model';

@Injectable({
  providedIn: 'root',
})
export class TaskDetailService {
  openedTaskDetailView: Task;
  editMode: boolean = false;
  closeTaskDetailViewAnimation: boolean = false;

  constructor(private appStateService: AppStateService) {}

  openTaskDetailView(task: Task) {
    this.openedTaskDetailView = task;
  }

  closeTaskDetailView() {
    this.closeTaskDetailViewAnimation = true;

    setTimeout(() => {
      this.closeTaskDetailViewAnimation = false;
      this.openedTaskDetailView = null;
      this.editMode = false;
    }, 300);
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  toggleSubtask(index: number) {
    this.openedTaskDetailView.subtasks[index].completed =
      !this.openedTaskDetailView.subtasks[index].completed;
  }
}
