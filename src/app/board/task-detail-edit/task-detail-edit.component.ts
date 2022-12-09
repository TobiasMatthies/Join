import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddTaskService } from 'src/app/add-task/add-task.service';
import { ChooseUrgencyService } from 'src/app/add-task/choose-urgency.service';
import { AppStateService } from 'src/app/app-state/app-state.service';
import { TaskDetailService } from '../task-detail.service';

@Component({
  selector: 'app-task-detail-edit',
  templateUrl: './task-detail-edit.component.html',
  styleUrls: ['./task-detail-edit.component.css'],
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

    if (this.addTaskService.formValueSubscription) {
      this.addTaskService.formValueSubscription.unsubscribe();
    }
  }

  onEditTask() {
    this.addTaskService.onEditTask();
  }
}
