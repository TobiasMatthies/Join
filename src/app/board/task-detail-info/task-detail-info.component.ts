import { Component } from '@angular/core';
import { TaskDetailService } from '../task-detail.service';

@Component({
  selector: 'app-task-detail-info',
  templateUrl: './task-detail-info.component.html',
  styleUrls: ['./task-detail-info.component.css'],
})
export class TaskDetailInfoComponent {
  constructor(public taskDetailService: TaskDetailService) {}
}
