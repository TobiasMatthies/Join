import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AddTaskService } from 'src/app/add-task/add-task.service';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'app-contact-detail-view',
  templateUrl: './contact-detail-view.component.html',
  styleUrls: ['./contact-detail-view.component.css']
})
export class ContactDetailViewComponent {
  @Input() selectedContact: Contact;
  @Output() toggleContactOverlay = new EventEmitter<boolean>();
  @Output() unselectContact = new EventEmitter<void>();

  constructor(public addTaskService: AddTaskService) {}

  onToggleContactOverlay(value: boolean) {
    this.toggleContactOverlay.emit(value);
  }

  onUnselectContact() {
    this.unselectContact.emit();
  }
}
