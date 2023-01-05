import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';
import { Task } from '../models/tasks.model';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  tasks: Task[] = [];
  contacts: Contact[] = [];
  categories: Array<{ name: string; color: string }> = [];
}
