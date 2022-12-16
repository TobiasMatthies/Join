import { Injectable, OnInit } from '@angular/core';
import { Contact } from '../models/contact.model';
import { Task } from '../models/tasks.model';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  contacts: Contact[] = [
    {
      name: 'You Test',
      email: 'you@you.com',
      phoneNumber: 1234678,
      backgroundColor: 'rgb(127, 17, 224)',
      abbrevation: 'YT',
    },
    {
      name: 'Friend1',
      email: 'friend1@friend1.com',
      phoneNumber: 10234567,
      backgroundColor: 'rgb(255, 165, 0)',
      abbrevation: 'F',
    },
    {
      name: 'Friend2 Asdf',
      email: 'friend2@friend2.com',
      phoneNumber: 12034567,
      backgroundColor: 'rgb(45, 246, 200)',
      abbrevation: 'FA',
    },
    {
      name: 'Bro1 Test',
      email: 'bro1@bro1.com',
      phoneNumber: 12034545,
      backgroundColor: 'rgb(245, 40, 145)',
      abbrevation: 'BT',
    },
  ];

  tasks: Task[] = [
    {
      title: 'test1',
      assignedTo: [this.contacts[0], this.contacts[1]],
      dueDate: new Date('2022-12-15'), //as soon as test tasks are'nt needed anymore change type from any to date
      category: { name: 'Sales', color: 'rgb(252,113,255)' },
      urgency: {
        name: 'urgent',
        image: 'assets/img/urgent1.svg',
        imageDetail: 'assets/img/urgentDetail.svg',
      },
      description: 'test description',
      subtasks: ['test subtask'],
      status: 'toDo',
      id: new Date().getTime() - 1500,
    },
    {
      title: 'test2 a bit longer now',
      assignedTo: [this.contacts[0], this.contacts[1], this.contacts[2], this.contacts[3]],
      dueDate: new Date(), //as soon as test tasks are'nt needed anymore change type from any to date
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

  categories: Array<{ name: string; color: string }> = [
    { name: 'Sales', color: 'rgb(252,113,255)' },
    { name: 'Backoffice', color: 'rgb(32,215,192)' },
  ];

  subtasks: string[] = ['test1'];
}
