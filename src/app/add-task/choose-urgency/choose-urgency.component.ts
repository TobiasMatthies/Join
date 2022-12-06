import { Component } from '@angular/core';
import { ChooseUrgencyService } from 'src/app/add-task/choose-urgency/choose-urgency.service';
import { AddTaskService } from '../add-task.service';

@Component({
  selector: 'app-choose-urgency',
  templateUrl: './choose-urgency.component.html',
  styleUrls: ['./choose-urgency.component.css'],
})
export class ChooseUrgencyComponent {
  constructor(
    public chooseUrgencyService: ChooseUrgencyService,
    public addTaskService: AddTaskService
  ) {}
}
