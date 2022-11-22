import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
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

  form: FormGroup;

  showContacts: boolean = false;
  showCategories: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.date = new Date().toISOString().split('T')[0];
    this.initForm();
    this.fillFormArrays();
  }

  chooseUrgency(urgency: string) {
    this.urgency = urgency;
  }

  initForm() {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      contacts: new FormGroup({}, [Validators.required]),
      dueDate: new FormControl(new Date().toISOString().split('T')[0], [
        Validators.required,
      ]),
      category: new FormControl(null, [Validators.required]),
      urgency: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      subtasks: new FormGroup({}),
    });
  }

  fillFormArrays() {
    this.fillContacts();
    this.fillSubtasks();
  }

  fillContacts() {
    for (let i = 0; i < this.demoContacts.length; i++) {
      const contact = this.demoContacts[i];

      (<FormGroup>this.form.get('contacts')).addControl(
        contact,
        new FormControl()
      );
    }
  }

  fillSubtasks() {
    for (let i = 0; i < this.demoSubtasks.length; i++) {
      const subtask = this.demoSubtasks[i];

      (<FormGroup>this.form.get('subtasks')).addControl(
        subtask,
        new FormControl()
      );
    }
  }

  createTask() {
    console.log(this.form);
  }

  /*createTask() {
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
    console.log(this.form);
    this.resetForm();
  }*/

  resetForm() {
    this.form.reset();
    this.urgency = null;
    //this.form.form.controls['date'].setValue(this.date);
  }

  toggleContacts() {
    this.showContacts = !this.showContacts;
  }

  toggleCategories() {
    this.showCategories = !this.showCategories;
  }
}
