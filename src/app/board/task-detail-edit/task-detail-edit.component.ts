import { Component, OnInit } from '@angular/core';
import { AddTaskService } from 'src/app/add-task/add-task.service';
import { ChooseUrgencyService } from 'src/app/add-task/choose-urgency.service';
import { TaskDetailService } from '../task-detail.service';

@Component({
  selector: 'app-task-detail-edit',
  templateUrl: './task-detail-edit.component.html',
  styleUrls: ['./task-detail-edit.component.css']
})
export class TaskDetailEditComponent implements OnInit {
  constructor(public taskDetailService: TaskDetailService, public addTaskService: AddTaskService, private chooseUrgencyService: ChooseUrgencyService) {}

  ngOnInit(): void {
    this.addTaskService.initEditForm();
    this.addTaskService.fillEditedContacts();
    this.chooseUrgencyService.chooseUrgency(this.taskDetailService.openedTaskDetailView.urgency.name);
    this.addTaskService.selectedContacts = this.taskDetailService.openedTaskDetailView.assignedTo;
    this.addTaskService.subscribeToContacts();
  }

  onEditTask() {
    this.addTaskService.onEditTask();
    this.taskDetailService.toggleEditMode();
  }
}
