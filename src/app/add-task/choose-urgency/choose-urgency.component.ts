import { Component } from '@angular/core';
import { ChooseUrgencyService } from 'src/app/add-task/choose-urgency.service';
import { AddTaskService } from '../../services/add-task.service';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-choose-urgency',
    templateUrl: './choose-urgency.component.html',
    styleUrls: ['./choose-urgency.component.css'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgClass,
        NgIf,
    ],
})
export class ChooseUrgencyComponent {
  constructor(
    public chooseUrgencyService: ChooseUrgencyService,
    public addTaskService: AddTaskService
  ) {}
}
