import { DatePipe, NgClass, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonPrimaryComponent } from '../../customComponents/button-primary/button-primary.component';
import { Contact } from '../../models/contact.model';
import { AppStateService } from '../../services/app-state.service';
import { TaskDetailService } from '../../services/task-detail.service';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ConfirmService } from './confirm.service';

@Component({
  selector: 'app-task-detail-info',
  templateUrl: './task-detail-info.component.html',
  styleUrls: ['./task-detail-info.component.css'],
  imports: [
    NgClass,
    NgStyle,
    ButtonPrimaryComponent,
    ConfirmDialogComponent,
    DatePipe,
  ],
})
export class TaskDetailInfoComponent {
  constructor(
    public taskDetailService: TaskDetailService,
    public confirmService: ConfirmService,
    private appState: AppStateService,
  ) {}

  identifyContact(contact: Contact): Boolean {
    return !!this.appState.contacts.find((c) => c.email === contact.email);
  }
}
