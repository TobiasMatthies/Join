import { Injectable } from '@angular/core';
import { AppStateService } from '../app-state/app-state.service';
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

  constructor(private appStateService: AppStateService) {}

  getSummaryInformation() {
    this.getTasksTodo();
    this.getTasksInBoard();
    this.getTasksInProgress();
    this.getTasksAwaitingFeedback();
    this.getTasksDone();
  }

  getTasksTodo() {
    this.tasksTodoInfo = {
      name: 'Tasks To-do',
      amount: this.findTasksWithStatus('toDo'),
    };
  }

  getTasksInBoard() {
    this.tasksInBoardInfo = {
      name: 'Tasks in Board',
      image: 'assets/img/Board.svg',
      amount: this.appStateService.tasks.length,
    };
  }

  getTasksInProgress() {
    this.tasksInProgressInfo = {
      name: 'Tasks in Progress',
      image: 'assets/img/In Progress.svg',
      amount: this.findTasksWithStatus('inProgress'),
    };
  }

  getTasksAwaitingFeedback() {
    this.tasksAwaitingFeedbackInfo = {
      name: 'Awaiting Feedback',
      image: 'assets/img/Awaiting feedback.svg',
      amount: this.findTasksWithStatus('awaitingFeedback'),
    };
  }

  getTasksDone() {
    this.tasksDoneInfo = {
      name: 'Tasks Done',
      image: 'assets/img/Done.svg',
      amount: this.findTasksWithStatus('done'),
    };
  }

  findTasksWithStatus(status: string) {
    let tasksWithStatusAmount: number = 0;

    for (let i = 0; i < this.appStateService.tasks.length; i++) {
      const task = this.appStateService.tasks[i];

      if (task.status === status) {
        tasksWithStatusAmount++;
      }
    }
    return tasksWithStatusAmount;
  }
}
