import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AddTaskService } from '../add-task/add-task.service';
import { AppStateService } from '../app-state/app-state.service';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  firstLetters: string[] = [];
  addContactOverlayOpened: boolean = false;

  editMode: boolean;
  selectedContact: Contact = null;

  constructor(
    public appStateService: AppStateService,
    public addTaskService: AddTaskService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  updateContacts(contact: Contact) {
    this.firstLetters = [];
    this.changeDetectorRef.detectChanges();
    this.getEveryFirstLetter();
    this.selectedContact = contact;
  }

  ngOnInit(): void {
    this.getEveryFirstLetter();
  }

  /**
   * function used to find all letters a contact's name starts with
   */
  getEveryFirstLetter() {
    for (let i = 0; i < this.appStateService.contacts.length; i++) {
      const contact = this.appStateService.contacts[i];

      if (!this.firstLetters.includes(contact.name.charAt(0))) {
        this.firstLetters.push(contact.name.charAt(0));
      }
    }
    this.firstLetters.sort();
  }

  onSelectContact(contact: Contact) {
    if (this.selectedContact !== contact) {
      this.selectedContact = contact;
    } else {
      this.selectedContact = null;
    }
  }

  toggleContactOverlay(editMode?: boolean) {
    if (editMode) {
      this.editMode = editMode;
    } else {
      this.editMode = false;
    }
    this.addContactOverlayOpened = !this.addContactOverlayOpened;
  }
}
