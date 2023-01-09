import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppStateService } from '../services/app-state.service';
import { ChooseUrgencyService } from './choose-urgency.service';
import { AddTaskService } from './add-task.service';
import { WindowWidthService } from '../layout/window-width.service';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit, OnDestroy {
  constructor(
    public windowWidthService: WindowWidthService,
    public addTaskService: AddTaskService,
    public appStateService: AppStateService,
    public chooseUrgencyService: ChooseUrgencyService,
    private dataStorageService: DataStorageService
  ) {}

  async ngOnInit() {
    await this.fetchData();
    console.log(this.appStateService.categories, this.appStateService.contacts);
    this.windowWidthService.getWindowWidth();
    this.addTaskService.initAddTaskForm();
    this.addTaskService.date = new Date().toISOString().split('T')[0];
    this.addTaskService.fillContacts();
    this.addTaskService.subscribeToAddTaskFormValues();
  }

  async fetchData() {
    if (
      this.appStateService.categories.length < 1 ||
      this.appStateService.contacts.length < 1
    ) {
      if (this.appStateService.categories.length < 1) {
        this.appStateService.categories = await this.dataStorageService.getItem(
          'categories.json'
        );
      }

      if (this.appStateService.contacts.length < 1) {
        this.appStateService.contacts = await this.dataStorageService.getItem(
          'contacts.json'
        );
      }
    }
  }

  ngOnDestroy(): void {
    this.addTaskService.categorySubscription.unsubscribe();
    this.addTaskService.contactSubscription.unsubscribe();

    if (this.addTaskService.formValueSubscription) {
      this.addTaskService.formValueSubscription.unsubscribe();
    }
  }
}
