import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppStateService } from 'src/app/app-state/app-state.service';
import { TaskDetailService } from 'src/app/board/task-detail.service';
import { WindowWidthService } from 'src/app/layout/window-width.service';
import { AddTaskService } from '../add-task.service';

@Component({
  selector: 'app-add-task-overlay',
  templateUrl: './add-task-overlay.component.html',
  styleUrls: ['./add-task-overlay.component.css'],
})
export class AddTaskOverlayComponent implements OnInit, OnDestroy {
  constructor(
    public addTaskService: AddTaskService,
    public taskDetailService: TaskDetailService,
    public appStateService: AppStateService,
    public windowWidthService: WindowWidthService
  ) {}

  ngOnInit(): void {
    this.windowWidthService.getWindowWidth();
    this.addTaskService.initAddTaskForm();
    this.addTaskService.date = new Date().toISOString().split('T')[0];
    this.addTaskService.fillFormArrays();
    this.addTaskService.subscribeToAddTaskFormValues();
  }

  ngOnDestroy(): void {
    this.addTaskService.categorySubscription.unsubscribe();
    this.addTaskService.contactSubscription.unsubscribe();

    if (this.addTaskService.formValueSubscription) {
      this.addTaskService.formValueSubscription.unsubscribe();
    }
  }
}
