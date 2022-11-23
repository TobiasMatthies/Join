import { Injectable } from "@angular/core";
import { Contact } from "../models/contact.model";
import { Task } from "../models/task.model";

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  tasks: Task[] = [];
  subtasks: string[] = [];
  contacts: Contact[] = [];
  categories: Array<{ name: string; color: string }> = [
    { name: 'Sales', color: 'rgb(252,113,255)' },
    { name: 'Backoffice', color: 'rgb(32,215,192)' }
  ];
}