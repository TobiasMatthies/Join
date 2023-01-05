import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStateService } from '../services/app-state.service';
import { Task } from '../models/tasks.model';
import { generalTasksInfo, urgentTasksInfo } from './task-info.models';
import { TasksInfoService } from './tasks-info.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  urgentTasks: Task[];
  urgentTasksInfo: urgentTasksInfo;

  generalInfoFields: generalTasksInfo[] = null;

  constructor(
    public tasksInfoService: TasksInfoService,
    private router: Router,
    private appStateService: AppStateService
  ) {}

  ngOnInit(): void {
    this.tasksInfoService.getSummaryInformation();
    this.findUrgentTasks();

    this.urgentTasksInfo = {
      amount: this.urgentTasks.length,
      deadline: this.urgentTasks[0].dueDate,
    };
    this.fillGeneralInfoFieldsArray();
  }

  findUrgentTasks() {
    this.urgentTasks = this.appStateService.tasks.filter(
      (task) => task.urgency.name === 'urgent'
    );

    if (!this.urgentTasks) {
      this.urgentTasks = [];
      return;
    }

    this.urgentTasks = this.urgentTasks.sort((a, b) => {
      return a.dueDate < b.dueDate ? -1 : a.dueDate > b.dueDate ? 1 : 0;
    });
  }

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
