import { Injectable } from '@angular/core';
import { AddTaskService } from 'src/app/add-task/add-task.service';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  confirmDialogOpened: boolean = false;

  constructor(private addTaskService: AddTaskService) {}

  onConfirmDelete() {
    this.addTaskService.onDeleteTask();
    this.toggleConfirmDialogOpened();
  }

  toggleConfirmDialogOpened() {
    this.confirmDialogOpened = !this.confirmDialogOpened;
  }
}
