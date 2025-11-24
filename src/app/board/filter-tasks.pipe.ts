import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/tasks.model';

@Pipe({
    name: 'filterTasks',
    pure: false,
    standalone: true,
})
export class FilterTasksPipe implements PipeTransform {
  transform(array: Task[], status: string): Task[] {
    return array.filter((task) => task['status'] == status);
  }
}
