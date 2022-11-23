import { Component, OnDestroy, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppStateService } from '../app-state/app-state.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit, OnDestroy {
  task: Task;
  selectedContacts: any[] = [];
  selectedCategory: { name: string; color: string };
  selectedSubtasks: string[] = [];

  demoSubtasks: string[] = ['test'];
  demoContacts = ['you', 'friend1', 'friend2'];
  demoCategoryColors: string[] = [
    'rgb(138,164,255)',
    'red',
    'rgb(43,211,2)',
    'rgb(255,138,0)',
    'rgb(225,0,190)',
    'rgb(0,56,255)',
  ];
  urgency;
  date;

  form: FormGroup;

  showContacts: boolean = false;
  showCategories: boolean = false;
  showInviteNewContact: boolean = false;
  showCreateNewCategory: boolean = false;

  categoryName: string;
  selectedColor: string;
  colors;
  formSubscription: Subscription;

  constructor(public appState: AppStateService) {}

  ngOnInit(): void {
    this.date = new Date().toISOString().split('T')[0];
    this.initForm();
    this.fillFormArrays();

    this.formSubscription = this.form.controls['category'].valueChanges.subscribe(() => {
      this.toggleCategories();
    });
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
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

  onCreateNewTaskCategory() {
    this.categoryName = document.getElementById('categoryName')['value'];
    this.colors = document.getElementsByName('newCategoryColor');

    this.createNewTaskCategory();
  }

  selectColor(color: string) {
    this.selectedColor = color;
  }

  createNewTaskCategory() {
    if (this.selectedColor && this.categoryName) {
      this.appState.categories.push({
        name: this.categoryName,
        color: this.selectedColor,
      });
      this.demoCategoryColors.splice(
        this.demoCategoryColors.indexOf(this.selectedColor),
        1
      );
      this.selectCategory();
    }
  }

  selectCategory() {
    this.toggleNewCategory();
    this.form.patchValue({
      'category': {
        name: this.categoryName,
        color: this.selectedColor
      }
    })
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

  toggleInviteNewContact() {
    this.showInviteNewContact = !this.showInviteNewContact;
  }

  toggleNewCategory() {
    this.showCreateNewCategory = !this.showCreateNewCategory;
  }
}
