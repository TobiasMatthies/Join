import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';
import { Task } from '../models/tasks.model';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  tasks: Task[] = [
    {
      title: 'test1',
      assignedTo: ['you', 'friend1'],
      dueDate: new Date().toISOString(), //as soon as test tasks are'nt needed anymore change type from any to date
      category: { name: 'Sales', color: 'rgb(252,113,255)' },
      urgency: {
        name: 'medium',
        image: 'assets/img/medium.svg',
        imageDetail: 'assets/img/mediumDetail.svg',
      },
      description: 'test description',
      subtasks: ['test subtask'],
      status: 'toDo',
      id: new Date().getTime() - 1500,
    },
    {
      title: 'test2 a bit longer now',
      assignedTo: ['you', 'friend1', 'friend2'],
      dueDate: new Date().toISOString(), //as soon as test tasks are'nt needed anymore change type from any to date
      category: { name: 'Backoffice', color: 'rgb(32,215,192)' },
      urgency: {
        name: 'urgent',
        image: 'assets/img/urgent1.svg',
        imageDetail: 'assets/img/urgentDetail.svg',
      },
      description:
        'test description, but this time its gotta be a bit longer, so Im just typing some random text',
      subtasks: [],
      status: 'inProgress',
      id: new Date().getTime() - 1000,
    },
  ];
  contacts: Contact[] = [];
  categories: Array<{ name: string; color: string }> = [
    { name: 'Sales', color: 'rgb(252,113,255)' },
    { name: 'Backoffice', color: 'rgb(32,215,192)' },
  ];
}
