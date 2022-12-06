import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../app-state/app-state.service';
import { ChooseUrgencyService } from './choose-urgency.service';
import { AddTaskService } from './add-task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  constructor(
    public addTaskService: AddTaskService,
    public appStateService: AppStateService,
    public chooseUrgencyService: ChooseUrgencyService
  ) {}

  ngOnInit(): void {
    this.addTaskService.initAddTaskForm();
    this.addTaskService.date = new Date().toISOString().split('T')[0];
    this.addTaskService.fillFormArrays();
    this.addTaskService.subscribeToAddTaskFormValues();
  }
}
