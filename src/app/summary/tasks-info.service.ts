import { Injectable } from '@angular/core';
import { AppStateService } from '../services/app-state.service';
import { DataStorageService } from '../services/data-storage.service';
import { generalTasksInfo } from './task-info.models';

@Injectable({
  providedIn: 'root',
})
export class TasksInfoService {
  tasksTodoInfo;
  tasksInBoardInfo: generalTasksInfo;
  tasksInProgressInfo: generalTasksInfo;
  tasksAwaitingFeedbackInfo: generalTasksInfo;
  tasksDoneInfo: generalTasksInfo;

  constructor(
    private appStateService: AppStateService,
    private dataStorageService: DataStorageService
  ) {}

  async getSummaryInformation() {
    await this.getTasksTodo();
    this.getTasksInBoard();
    this.getTasksInProgress();
    this.getTasksAwaitingFeedback();
    this.getTasksDone();
  }

  async getTasksTodo() {
    this.tasksTodoInfo = {
      name: 'Tasks To-do',
      amount: await this.findTasksWithStatus('toDo'),
    };
  }

  getTasksInBoard() {
    this.tasksInBoardInfo = {
      name: 'Tasks in Board',
      image: 'assets/img/Board.svg',
      amount: this.appStateService.tasks.length,
    };
  }

  async getTasksInProgress() {
    this.tasksInProgressInfo = {
      name: 'Tasks in Progress',
      image: 'assets/img/In Progress.svg',
      amount: await this.findTasksWithStatus('inProgress'),
    };
  }

  async getTasksAwaitingFeedback() {
    this.tasksAwaitingFeedbackInfo = {
      name: 'Awaiting Feedback',
      image: 'assets/img/Awaiting feedback.svg',
      amount: await this.findTasksWithStatus('awaitingFeedback'),
    };
  }

  async getTasksDone() {
    this.tasksDoneInfo = {
      name: 'Tasks Done',
      image: 'assets/img/Done.svg',
      amount: await this.findTasksWithStatus('done'),
    };
  }

  async findTasksWithStatus(status: string) {
    let tasksWithStatusAmount: number = 0;

    if (this.appStateService.tasks.length < 1) {
      this.appStateService.tasks = await this.dataStorageService.getItem(
        'tasks.json'
      );
    }

    for (let i = 0; i < this.appStateService.tasks.length; i++) {
      const task = this.appStateService.tasks[i];

      if (task.status === status) {
        tasksWithStatusAmount++;
      }
    }
    return tasksWithStatusAmount;
  }
}
