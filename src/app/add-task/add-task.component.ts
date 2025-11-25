import { NgClass, NgStyle } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonPrimaryComponent } from '../customComponents/button-primary/button-primary.component';
import { LayoutComponent } from '../layout/layout.component';
import { WindowWidthService } from '../layout/window-width.service';
import { AddTaskService } from '../services/add-task.service';
import { AppStateService } from '../services/app-state.service';
import { DataStorageService } from '../services/data-storage.service';
import { ChooseUrgencyService } from './choose-urgency.service';
import { ChooseUrgencyComponent } from './choose-urgency/choose-urgency.component';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  imports: [
    LayoutComponent,
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    NgStyle,
    ChooseUrgencyComponent,
    ButtonPrimaryComponent,
  ],
})
export class AddTaskComponent implements OnInit, OnDestroy {
  showInviteNewContactInfo: boolean;

  constructor(
    public windowWidthService: WindowWidthService,
    public addTaskService: AddTaskService,
    public appStateService: AppStateService,
    public chooseUrgencyService: ChooseUrgencyService,
    private dataStorageService: DataStorageService
  ) {}

  async ngOnInit() {
    this.windowWidthService.getWindowWidth();
    this.addTaskService.initAddTaskForm();
    this.addTaskService.fillContacts();
    await this.dataStorageService.fetchData();
    this.addTaskService.fillContacts();
    this.addTaskService.date = new Date().toISOString().split('T')[0];
    this.addTaskService.subscribeToAddTaskFormValues();
  }

  ngOnDestroy(): void {
    if (this.addTaskService.categorySubscription)
      this.addTaskService.categorySubscription.unsubscribe();

    if (this.addTaskService.contactSubscription)
      this.addTaskService.contactSubscription.unsubscribe();

    if (this.addTaskService.formValueSubscription)
      this.addTaskService.formValueSubscription.unsubscribe();
  }
}
