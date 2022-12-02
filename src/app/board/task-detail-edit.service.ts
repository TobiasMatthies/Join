import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskDetailEditService {
  editMode: boolean = false;
  constructor() { }
}
