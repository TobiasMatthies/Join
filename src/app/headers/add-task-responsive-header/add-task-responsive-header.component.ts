import { Component } from '@angular/core';
import { AddTaskService } from 'src/app/services/add-task.service';
import { ButtonPrimaryComponent } from '../../customComponents/button-primary/button-primary.component';

@Component({
    selector: 'app-add-task-responsive-header',
    templateUrl: './add-task-responsive-header.component.html',
    styleUrls: ['./add-task-responsive-header.component.css'],
    standalone: true,
    imports: [ButtonPrimaryComponent],
})
export class AddTaskResponsiveHeaderComponent {
  constructor(public addTaskService: AddTaskService) {}
}
