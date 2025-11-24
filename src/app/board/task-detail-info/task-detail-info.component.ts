import { Component } from '@angular/core';
import { TaskDetailService } from '../../services/task-detail.service';
import { ConfirmService } from './confirm.service';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ButtonPrimaryComponent } from '../../customComponents/button-primary/button-primary.component';
import { NgClass, NgStyle, NgIf, NgFor, DatePipe } from '@angular/common';

@Component({
    selector: 'app-task-detail-info',
    templateUrl: './task-detail-info.component.html',
    styleUrls: ['./task-detail-info.component.css'],
    imports: [
        NgClass,
        NgStyle,
        NgIf,
        NgFor,
        ButtonPrimaryComponent,
        ConfirmDialogComponent,
        DatePipe,
    ]
})
export class TaskDetailInfoComponent {
  constructor(
    public taskDetailService: TaskDetailService,
    public confirmService: ConfirmService
  ) {}
}
