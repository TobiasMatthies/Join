import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppStateService } from './app-state.service';
import { ChooseUrgencyService } from '../add-task/choose-urgency.service';
import { atLeastOneCheckboxCheckedValidator } from '../add-task/contacts.validator';

import { EditedTask, Task } from '../models/tasks.model';
import { TaskDetailService } from '../board/task-detail.service';
import { DataStorageService } from './data-storage.service';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class AddTaskService {
  categoryColors: string[] = [
    'rgb(138,164,255)',
    'red',
    'rgb(43,211,2)',
    'rgb(255,138,0)',
    'rgb(225,0,190)',
    'rgb(0,56,255)',
  ];
  date;

  form: FormGroup;

  showContacts: boolean = false;
  showCategories: boolean = false;
  showInviteNewContact: boolean = false;
  showCreateNewCategory: boolean = false;
  addTaskOverlayOpened: boolean = false;

  categoryName: string;
  selectedColor: string;
  colors;
  categorySubscription: Subscription;
  contactSubscription: Subscription;
  formValueSubscription: Subscription;
  selectedContacts: any[] = []; //Contact array
  selectedSubtasks = [];
  taskStatus: string;
  submitted: boolean = false;
  subtasks: Array<{ name: string; completed: boolean }> = [];

  taskCreated: boolean = false;

  constructor(
    private appStateService: AppStateService,
    private chooseUrgencyService: ChooseUrgencyService,
    private taskDetailService: TaskDetailService,
    private dataStorageService: DataStorageService
  ) {}

  initAddTaskForm() {
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

  initEditForm() {
    this.form = new FormGroup({
      title: new FormControl(
        this.taskDetailService.openedTaskDetailView.title,
        [Validators.required]
      ),
      description: new FormControl(
        this.taskDetailService.openedTaskDetailView.description,
        [Validators.required]
      ),
      dueDate: new FormControl(
        this.taskDetailService.openedTaskDetailView.dueDate,
        [Validators.required]
      ),
      urgency: new FormControl(
        this.taskDetailService.openedTaskDetailView.urgency,
        [Validators.required]
      ),
      contacts: new FormGroup({}, [atLeastOneCheckboxCheckedValidator()]),
    });
  }

  fillContacts(): Contact[] {
    for (let i = 0; i < this.appStateService.contacts.length; i++) {
      (<FormGroup>this.form.get('contacts')).addControl(
        i.toString(),
        new FormControl()
      );
    }

    return this.appStateService.contacts;
  }

  fillEditedContacts() {
    let assignees = this.taskDetailService.openedTaskDetailView.assignedTo;

    for (let i = 0; i < this.appStateService.contacts.length; i++) {
      const contact = this.appStateService.contacts[i];
      let assigned = assignees.includes(contact);

      (<FormGroup>this.form.get('contacts')).addControl(
        i.toString(),
        new FormControl(assigned)
      );
    }
  }

  subscribeToAddTaskFormValues() {
    this.subscribeToCategory();
    this.subscribeToContacts();
  }

  subscribeToCategory() {
    this.categorySubscription = this.form.controls[
      'category'
    ].valueChanges.subscribe(() => {
      this.toggleCategories();
    });
  }

  subscribeToContacts() {
    this.contactSubscription = this.form.controls[
      'contacts'
    ].valueChanges.subscribe(() => {
      this.getOnlySelectedValues('contacts');
    });
  }

  onCreateTask() {
    this.submitted = true;
    if (this.form.valid) {
      this.getOnlySelectedValues('contacts');
      this.getOnlySelectedValues('subtasks');
      let task: Task = this.createTask();
      this.appStateService.tasks.push(task);
      this.dataStorageService.setItem(this.appStateService.tasks, 'tasks.json');
      this.cleanForm();
      this.showTaskCreated();
    } else {
      this.resetSubmission();
    }
  }

  createTask() {
    return {
      title: this.form.controls['title'].value,
      assignedTo: this.selectedContacts,
      dueDate: this.form.controls['dueDate'].value,
      category: this.form.controls['category'].value,
      urgency: this.form.controls['urgency'].value,
      description: this.form.controls['description'].value,
      subtasks: this.selectedSubtasks,
      status: this.taskStatus ? this.taskStatus : 'toDo',
      id: new Date().getTime(),
    };
  }

  getOnlySelectedValues(formControl: string) {
    let valueObject = this.form.controls[formControl].value;
    this.resetSelectedValues(formControl);

    for (let i = 0; i < Object.keys(valueObject).length; i++) {
      let value: any = Object.keys(valueObject)[i];
      value = parseFloat(value);

      if (Object.entries(valueObject)[i][1]) {
        this.pushSelectedValues(formControl, value);
      }
    }
  }

  resetSelectedValues(formControl: string) {
    if (formControl == 'contacts') {
      this.selectedContacts = [];
    }
    if (formControl == 'subtasks') {
      this.selectedSubtasks = [];
    }
  }

  pushSelectedValues(formControl: string, i: number) {
    if (formControl == 'contacts') {
      let contact = this.appStateService.contacts[i];
      this.selectedContacts.push(contact);
    }
    if (formControl == 'subtasks') {
      let subtasks = this.subtasks;
      let subtask = subtasks[i];
      this.selectedSubtasks.push({ ...subtask });
    }
  }

  cleanForm() {
    this.subtasks = [];
    this.resetForm();
    this.submitted = false;

    if (this.addTaskOverlayOpened) {
      this.taskStatus = null;
      this.toggleAddTaskOverlay();
    }
  }

  showTaskCreated() {
    this.taskCreated = true;

    setTimeout(() => {
      this.taskCreated = false;
    }, 1500);
  }

  onEditTask() {
    this.submitted = true;

    if (this.form.valid) {
      let editedTask = this.getEditedValues();
      this.editTask(editedTask);
      this.submitted = false;
      this.taskDetailService.toggleEditMode();
    } else {
      this.resetSubmission();
    }
  }

  getEditedValues() {
    return {
      title: this.form.controls['title'].value,
      description: this.form.controls['description'].value,
      dueDate: this.form.controls['dueDate'].value,
      urgency: this.form.controls['urgency'].value,
      assignedTo: this.selectedContacts,
    };
  }

  editTask(editedTask: EditedTask) {
    this.taskDetailService.openedTaskDetailView.title = editedTask.title;
    this.taskDetailService.openedTaskDetailView.description =
      editedTask.description;
    this.taskDetailService.openedTaskDetailView.dueDate = editedTask.dueDate;
    this.taskDetailService.openedTaskDetailView.urgency = editedTask.urgency;
    this.taskDetailService.openedTaskDetailView.assignedTo =
      editedTask.assignedTo;
  }

  onDeleteTask() {
    this.appStateService.tasks.splice(
      this.appStateService.tasks.indexOf(
        this.taskDetailService.openedTaskDetailView
      ),
      1
    );
    this.dataStorageService.setItem(this.appStateService.tasks, 'tasks.json');
    this.taskDetailService.closeTaskDetailView();
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

  createNewTaskCategory() {
    if (this.selectedColor && this.categoryName) {
      this.appStateService.categories.push({
        name: this.categoryName,
        color: this.selectedColor,
      });
      this.dataStorageService.setItem(
        this.appStateService.categories,
        'categories.json'
      );
      this.categoryColors.splice(
        this.categoryColors.indexOf(this.selectedColor),
        1
      );
      this.selectCategory();
    }
  }

  selectColor(color: string) {
    if (!this.categoryColors.includes(color)) {
      this.categoryColors.push(color);
    }

    this.selectedColor = color;
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
    let subtask: { name: string; completed: boolean } = {
      name: document.getElementById('subtask')['value'],
      completed: false,
    };

    if (subtask) {
      (<FormGroup>this.form.get('subtasks')).addControl(
        this.subtasks.length.toString(),
        new FormControl(true)
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
    this.hideDropdowns();
    this.chooseUrgencyService.urgency = null;
    this.form.patchValue({
      dueDate: this.date,
    });
  }
  hideDropdowns() {
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
    this.showCategories = false;
    this.showContacts = !this.showContacts;
  }

  toggleCategories() {
    this.showContacts = false;
    this.showCategories = !this.showCategories;
  }

  toggleInviteNewContact() {
    this.showInviteNewContact = !this.showInviteNewContact;
  }

  toggleNewCategory() {
    if (this.showCreateNewCategory) {
      this.categoryColors = [
        'rgb(138,164,255)',
        'red',
        'rgb(43,211,2)',
        'rgb(255,138,0)',
        'rgb(225,0,190)',
        'rgb(0,56,255)',
      ];
    }

    this.showCreateNewCategory = !this.showCreateNewCategory;
  }

  toggleAddTaskOverlay(status?: string) {
    this.addTaskOverlayOpened = !this.addTaskOverlayOpened;

    if (status) {
      this.taskStatus = status;
    }
  }
}
