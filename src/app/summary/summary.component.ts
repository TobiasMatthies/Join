import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { generalTasksInfo, urgentTasksInfo } from './task-info.models';
import { TasksInfoService } from './tasks-info.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  urgentTasksInfo: urgentTasksInfo;

  generalInfoFields: generalTasksInfo[] = null;

  constructor(public tasksInfoService: TasksInfoService, private router: Router) {}

  ngOnInit(): void {
    this.urgentTasksInfo = {
      amount: 1,
      deadline:
        new Date().toLocaleString('en-US', { month: 'long' }) +
        ' ' +
        new Date().getDay() +
        ', ' +
        new Date().getFullYear(),
    };

    this.assignGeneralInfo();
    this.fillGeneralInfoFieldsArray();
  }

  assignGeneralInfo() {}

  fillGeneralInfoFieldsArray() {
    this.generalInfoFields = [
      this.tasksInfoService.tasksInBoardInfo,
      this.tasksInfoService.tasksInProgressInfo,
      this.tasksInfoService.tasksAwaitingFeedbackInfo,
      this.tasksInfoService.tasksDoneInfo,
    ];
  }

  navigateToBoard() {
    this.router.navigate(['/board']);
  }
}
