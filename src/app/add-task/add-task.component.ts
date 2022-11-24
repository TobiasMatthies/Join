import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppStateService } from '../app-state/app-state.service';
import { Task } from '../models/task.model';
import { atLeastOneCheckboxCheckedValidator } from './contacts.validator';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit, OnDestroy {
  subtasks: string[] = [];

  demoContacts = ['you', 'friend1', 'friend2'];
  categoryColors: string[] = [
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
  categorySubscription: Subscription;
  formValueSubscription: Subscription;
  submitted: boolean = false;

  constructor(public appState: AppStateService) {}

  ngOnInit(): void {
    this.date = new Date().toISOString().split('T')[0];
    this.initForm();
    this.fillFormArrays();

    this.categorySubscription = this.form.controls[
      'category'
    ].valueChanges.subscribe(() => {
      this.toggleCategories();
    });
  }

  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe();
    this.formValueSubscription.unsubscribe();
  }

  chooseUrgency(urgency: string) {
    this.urgency = urgency;
  }

  initForm() {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      contacts: new FormGroup({}, [atLeastOneCheckboxCheckedValidator()]),
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
    for (let i = 0; i < this.subtasks.length; i++) {
      const subtask = this.subtasks[i];

      (<FormGroup>this.form.get('subtasks')).addControl(
        subtask,
        new FormControl()
      );
    }
  }

  onCreateTask() {
    this.submitted = true;
    if (this.form.valid) {
      let task: Task = this.createTask();
      this.appState.tasks.push(task);

      console.log(task);
      console.log(this.appState.tasks);
      this.resetForm();
      this.submitted = false;
    } else {
      this.resetSubmission();
    }
  }

  createTask() {
    return {
      title: this.form.controls['title'].value,
      assignedTo: this.form.controls['contacts'].value,
      dueDate: this.form.controls['dueDate'].value,
      category: this.form.controls['category'].value,
      urgency: this.form.controls['urgency'].value,
      description: this.form.controls['description'].value,
      subtasks: this.form.controls['subtasks'].value,
    };
  }

  onCreateNewTaskCategory() {
    this.categoryName = document.getElementById('categoryName')['value'];
    this.colors = document.getElementsByName('newCategoryColor');

    this.createNewTaskCategory();
  }

  resetSubmission() {
    this.formValueSubscription = this.form.valueChanges.subscribe(() => {
      this.submitted = false;
      this.formValueSubscription.unsubscribe();
    });
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
      this.categoryColors.splice(
        this.categoryColors.indexOf(this.selectedColor),
        1
      );
      this.selectCategory();
    }
  }

  selectCategory() {
    this.toggleNewCategory();
    this.form.patchValue({
      category: {
        name: this.categoryName,
        color: this.selectedColor,
      },
    });
  }

  onCreateNewSubtask() {
    let subtask = document.getElementById('subtask')['value'];

    if (subtask) {
      (<FormGroup>this.form.get('subtasks')).addControl(
        subtask,
        new FormControl()
      );
      this.subtasks.push(subtask);
      document.getElementById('subtask')['value'] = '';
    }
  }

  /**
   * resets form
   *
   * toggleContacts closes contact dropdown that is opening because the value of contacts got changed
   * and therefore triggerst the subscribtion with "valueChanges"
   *
   * urgency gets resetted
   * date gets set
   */
  resetForm() {
    this.form.reset();
    this.toggleDropdowns();
    this.urgency = null;
    this.form.patchValue({
      dueDate: this.date,
    });
  }

  toggleDropdowns() {
    if (this.showContacts) {
      this.toggleContacts();
    }

    if (this.showInviteNewContact) {
      this.toggleInviteNewContact();
    }

    if (this.showCategories) {
      this.toggleCategories();
    }

    if (this.showCreateNewCategory) {
      this.toggleNewCategory();
    }
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
