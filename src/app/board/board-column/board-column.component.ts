import { Component, Input } from '@angular/core';
import { AddTaskService } from 'src/app/services/add-task.service';
import { AppStateService } from 'src/app/services/app-state.service';
import { Task } from 'src/app/models/tasks.model';
import { TaskDetailService } from '../task-detail.service';

@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.css'],
})
export class BoardColumnComponent {
  @Input() title: string;
  @Input() filter: string;
  @Input() filteredTasks: Task[] = [];

  constructor(
    public appStateService: AppStateService,
    public addTaskService: AddTaskService,
    public taskDetailService: TaskDetailService
  ) {}

  findCompletedSubtasks(
    subtasks: Array<{ name: string; completed: boolean }>,
    percentage: boolean
  ) {
    let completedSubtasks = subtasks.filter((subtask) => subtask.completed);

    if (percentage) {
      let percentage = (completedSubtasks.length / subtasks.length) * 100 + '%';

      return percentage;
    }

    return completedSubtasks.length;
  }
}
