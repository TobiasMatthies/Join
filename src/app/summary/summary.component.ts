import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStateService } from '../services/app-state.service';
import { Task } from '../models/tasks.model';
import { generalTasksInfo, urgentTasksInfo } from './task-info.models';
import { TasksInfoService } from './tasks-info.service';
import { AuthService } from '../services/auth.service';
import { take } from 'rxjs';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { LayoutComponent } from '../layout/layout.component';

@Component({
    selector: 'app-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.css'],
    standalone: true,
    imports: [
        LayoutComponent,
        NgIf,
        NgFor,
        DatePipe,
    ],
})
export class SummaryComponent implements OnInit {
  urgentTasks: Task[];
  urgentTasksInfo: urgentTasksInfo;
  dayTime: string;
  username: string;

  generalInfoFields: generalTasksInfo[] = null;

  constructor(
    public tasksInfoService: TasksInfoService,
    private router: Router,
    private appStateService: AppStateService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    await this.tasksInfoService.getSummaryInformation();
    this.findUrgentTasks();

    this.urgentTasksInfo = {
      amount: this.urgentTasks.length,
      deadline: this.urgentTasks[0].dueDate,
    };
    this.fillGeneralInfoFieldsArray();
    this.getDayTime();
    this.getUserName();
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

  getDayTime() {
    let hours = new Date().getHours();
    console.log(hours)
    
    if (hours < 4 || hours > 17) {
      this.dayTime = 'evening'
    }
    else if (hours < 11) {
      this.dayTime = 'morning'
    }
    else if (hours < 18) {
      this.dayTime = 'day'
    }
  }

  getUserName() {
    let userEmail: string;
     this.authService.user.pipe(take(1)).subscribe(resData => {
       userEmail = resData.email;
    });
    
    this.username = localStorage.getItem(userEmail);
    console.log(this.username);
  }
}
