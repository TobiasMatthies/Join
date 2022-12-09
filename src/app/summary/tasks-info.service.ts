import { Injectable } from '@angular/core';
import { AppStateService } from '../app-state/app-state.service';
import { generalTasksInfo } from './task-info.models';

@Injectable({
  providedIn: 'root',
})
export class TasksInfoService {
  constructor(private appStateService: AppStateService) {}

  //needs to be in a function
  tasksTodoInfo = {
    name: 'Tasks To-do',
    amount: this.findTasksWithStatus('todo'),
  };

  tasksInBoardInfo: generalTasksInfo = {
    name: 'Tasks in Board',
    image: 'assets/img/Board.svg',
    amount: this.appStateService.tasks.length,
  };

  tasksInProgressInfo: generalTasksInfo = {
    name: 'Tasks in Progress',
    image: 'assets/img/In Progress.svg',
    amount: this.findTasksWithStatus('inProgress'),
  };

  tasksAwaitingFeedbackInfo: generalTasksInfo = {
    name: 'Awaiting Feedback',
    image: 'assets/img/Awaiting feedback.svg',
    amount: this.findTasksWithStatus('awaitingFeedback'),
  };

  tasksDoneInfo: generalTasksInfo = {
    name: 'Tasks Done',
    image: 'assets/img/Done.svg',
    amount: this.findTasksWithStatus('done'),
  };

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
