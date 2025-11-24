import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppStateService } from 'src/app/services/app-state.service';
import { TaskDetailService } from 'src/app/services/task-detail.service';
import { WindowWidthService } from 'src/app/layout/window-width.service';
import { AddTaskService } from '../../services/add-task.service';
import { ChooseUrgencyComponent } from '../choose-urgency/choose-urgency.component';
import { ButtonPrimaryComponent } from '../../customComponents/button-primary/button-primary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTaskResponsiveHeaderComponent } from '../../headers/add-task-responsive-header/add-task-responsive-header.component';
import { NgClass, NgStyle } from '@angular/common';

@Component({
    selector: 'app-add-task-overlay',
    templateUrl: './add-task-overlay.component.html',
    styleUrls: ['./add-task-overlay.component.css'],
    imports: [
    AddTaskResponsiveHeaderComponent,
    NgClass,
    FormsModule,
    ReactiveFormsModule,
    ButtonPrimaryComponent,
    NgStyle,
    ChooseUrgencyComponent
]
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
    this.addTaskService.fillContacts();
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
