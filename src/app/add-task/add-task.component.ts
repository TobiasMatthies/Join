import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppStateService } from '../services/app-state.service';
import { ChooseUrgencyService } from './choose-urgency.service';
import { AddTaskService } from '../services/add-task.service';
import { WindowWidthService } from '../layout/window-width.service';
import { DataStorageService } from '../services/data-storage.service';
import { ButtonPrimaryComponent } from '../customComponents/button-primary/button-primary.component';
import { ChooseUrgencyComponent } from './choose-urgency/choose-urgency.component';
import { NgIf, NgClass, NgFor, NgStyle } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from '../layout/layout.component';

@Component({
    selector: 'app-add-task',
    templateUrl: './add-task.component.html',
    styleUrls: ['./add-task.component.css'],
    imports: [
        LayoutComponent,
        FormsModule,
        ReactiveFormsModule,
        NgIf,
        NgClass,
        NgFor,
        NgStyle,
        ChooseUrgencyComponent,
        ButtonPrimaryComponent,
    ]
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
    this.addTaskService.categorySubscription.unsubscribe();
    this.addTaskService.contactSubscription.unsubscribe();

    if (this.addTaskService.formValueSubscription) {
      this.addTaskService.formValueSubscription.unsubscribe();
    }
  }
}
