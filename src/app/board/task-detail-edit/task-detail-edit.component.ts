import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddTaskService } from 'src/app/services/add-task.service';
import { ChooseUrgencyService } from 'src/app/add-task/choose-urgency.service';
import { AppStateService } from 'src/app/services/app-state.service';
import { TaskDetailService } from '../../services/task-detail.service';
import { ButtonPrimaryComponent } from '../../customComponents/button-primary/button-primary.component';
import { ChooseUrgencyComponent } from '../../add-task/choose-urgency/choose-urgency.component';
import { NgClass, NgIf, NgFor, NgStyle } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-task-detail-edit',
    templateUrl: './task-detail-edit.component.html',
    styleUrls: ['./task-detail-edit.component.css'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgClass,
        NgIf,
        ChooseUrgencyComponent,
        NgFor,
        NgStyle,
        ButtonPrimaryComponent,
    ],
})
export class TaskDetailEditComponent implements OnInit, OnDestroy {
  constructor(
    public taskDetailService: TaskDetailService,
    public addTaskService: AddTaskService,
    private chooseUrgencyService: ChooseUrgencyService,
    public appStateService: AppStateService
  ) {}

  ngOnInit(): void {
    this.addTaskService.initEditForm();
    this.addTaskService.fillEditedContacts();
    this.chooseUrgencyService.chooseUrgency(
      this.taskDetailService.openedTaskDetailView.urgency.name
    );
    this.addTaskService.selectedContacts =
      this.taskDetailService.openedTaskDetailView.assignedTo;
    this.addTaskService.subscribeToContacts();
  }

  ngOnDestroy(): void {
    this.addTaskService.contactSubscription.unsubscribe();
    this.addTaskService.selectedContacts = [];
    this.chooseUrgencyService.urgency = null;

    if (this.addTaskService.formValueSubscription) {
      this.addTaskService.formValueSubscription.unsubscribe();
    }
  }

  onEditTask() {
    this.addTaskService.onEditTask();
  }
}
