import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  @ViewChild('form', { static: true }) form: NgForm;

  task: Task;
  demoSubtasks: string[] = ['test'];
  demoContacts = ['you', 'friend1', 'friend2'];
  demoCategories = [{}, {}];
  urgency;
  date;

  showContacts: boolean = false;
  showCategories: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.date = new Date().toISOString().split('T')[0];
  }

  chooseUrgency(urgency: string) {
    this.urgency = urgency;
  }
  
  createTask() {
    this.task = {
      title: this.form.form.value.title,
      assignedTo: [],
      dueDate: this.form.form.value.date,
      category: 'test',
      urgency: this.form.form.value.urgency,
      description: this.form.form.value.description,
      subtasks: [],
    };

    console.log(this.task);
    this.resetForm();
  }

  resetForm() {
    this.form.reset();
    this.form.form.controls['date'].setValue(this.date);
  }

  toggleContacts() {
    this.showContacts = !this.showContacts
  }

  toggleCategories() {
    this.showCategories = !this.showCategories
  }
}
