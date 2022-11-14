import { Injectable } from '@angular/core';
import { generalTasksInfo } from './task-info.models';

@Injectable({
  providedIn: 'root',
})
export class TasksInfoService {
  tasksTodoInfo = {
    name: 'Tasks To-do',
    amount: 1
  };

  tasksInBoardInfo: generalTasksInfo = {
    name: 'Tasks in Board',
    image: 'assets/img/Board.svg',
    amount: 5
  };

  tasksInProgressInfo: generalTasksInfo = {
    name: 'Tasks in Progress',
    image: 'assets/img/In Progress.svg',
    amount: 2
  };

  tasksAwaitingFeedbackInfo: generalTasksInfo = {
    name: 'Awaiting Feedback',
    image: 'assets/img/Awaiting feedback.svg',
    amount: 2
  };

  tasksDoneInfo: generalTasksInfo = {
    name: 'Tasks Done',
    image: 'assets/img/Done.svg',
    amount: 1
  };
}
