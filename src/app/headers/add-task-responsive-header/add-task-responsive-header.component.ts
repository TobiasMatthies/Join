import { Component } from '@angular/core';
import { AddTaskService } from 'src/app/services/add-task.service';
import { ThemeToggleComponent } from '../../customComponents/theme-toggle/theme-toggle.component';
import { ButtonPrimaryComponent } from '../../customComponents/button-primary/button-primary.component';

@Component({
    selector: 'app-add-task-responsive-header',
    templateUrl: './add-task-responsive-header.component.html',
    styleUrls: ['./add-task-responsive-header.component.css'],
    imports: [ButtonPrimaryComponent, ThemeToggleComponent]
})
export class AddTaskResponsiveHeaderComponent {
  constructor(public addTaskService: AddTaskService) {}
}
