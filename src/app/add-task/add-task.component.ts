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
  selectedContacts: any[] = [];
  selectedCategory: { name: string; color: string };
  selectedSubtasks: string[] = [];

  demoSubtasks: string[] = ['test'];
  demoContacts = ['you', 'friend1', 'friend2'];
  demoCategoryColors: string[] = [
    'rgb(252,113,255)',
    'rgb(32,215,192)',
    'rgb(138,164,255)',
    'red',
    'rgb(43,211,2)',
    'rgb(255,138,0)',
    'rgb(225,0,190)',
    'rgb(0,56,255)',
  ];
  demoCategories: Array<{ name: string; color: string }> = [
    { name: 'test1', color: 'rgb(252,113,255)' },
    { name: 'test2', color: 'rgb(32,215,192)' },
  ];
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
      assignedTo: this.selectedContacts,
      dueDate: this.form.form.value.date,
      category: this.selectedCategory,
      urgency: this.form.form.value.urgency,
      description: this.form.form.value.description,
      subtasks: [],
    };

    console.log(this.task);
    this.resetForm();
  }

  resetForm() {
    this.form.reset();
    this.urgency = null;
    this.form.form.controls['date'].setValue(this.date);
  }

  toggleContacts() {
    this.showContacts = !this.showContacts;
  }

  toggleCategories() {
    this.showCategories = !this.showCategories;
  }

  onAssignContact(contact: string) {
    if (this.selectedContacts.includes(contact)) {
      this.selectedContacts.splice(this.selectedContacts.indexOf(contact), 1);
    } else {
      this.selectedContacts.push(contact);
    }
  }

  onSelectCategory(category: { name: string; color: string }) {
    this.selectedCategory = category;
  }
}
