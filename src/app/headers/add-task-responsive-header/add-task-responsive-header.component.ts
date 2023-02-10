import { Component } from '@angular/core';
import { AddTaskService } from 'src/app/services/add-task.service';

@Component({
  selector: 'app-add-task-responsive-header',
  templateUrl: './add-task-responsive-header.component.html',
  styleUrls: ['./add-task-responsive-header.component.css'],
})
export class AddTaskResponsiveHeaderComponent {
  constructor(public addTaskService: AddTaskService) {}
}
