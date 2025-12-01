import { NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { AddTaskService } from 'src/app/services/add-task.service';
import { ButtonPrimaryComponent } from '../../customComponents/button-primary/button-primary.component';

@Component({
  selector: 'app-contact-detail-view',
  templateUrl: './contact-detail-view.component.html',
  styleUrls: ['./contact-detail-view.component.css'],
  imports: [NgStyle, ButtonPrimaryComponent],
})
export class ContactDetailViewComponent {
  @Input() selectedContact: Contact;
  @Output() toggleContactOverlay = new EventEmitter<boolean>();
  @Output() unselectContact = new EventEmitter<void>();
  @Output() deleteContact = new EventEmitter<Contact>();

  constructor(public addTaskService: AddTaskService) {}

  onToggleContactOverlay(value: boolean) {
    this.toggleContactOverlay.emit(value);
  }

  onDeleteContact() {
    this.deleteContact.emit(this.selectedContact);
  }

  onUnselectContact() {
    this.unselectContact.emit();
  }
}
