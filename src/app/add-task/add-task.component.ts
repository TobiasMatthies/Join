import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppStateService } from '../services/app-state.service';
import { ChooseUrgencyService } from './choose-urgency.service';
import { AddTaskService } from './add-task.service';
import { WindowWidthService } from '../layout/window-width.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit, OnDestroy {
  constructor(
    public windowWidthService: WindowWidthService,
    public addTaskService: AddTaskService,
    public appStateService: AppStateService,
    public chooseUrgencyService: ChooseUrgencyService
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
