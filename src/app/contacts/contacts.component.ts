import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AddTaskService } from '../services/add-task.service';
import { AppStateService } from '../services/app-state.service';
import { WindowWidthService } from '../layout/window-width.service';
import { Contact } from '../models/contact.model';
import { DataStorageService } from '../services/data-storage.service';

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
    public windowWidthService: WindowWidthService,
    private changeDetectorRef: ChangeDetectorRef,
    private dataStorageService: DataStorageService
  ) {}

  async ngOnInit() {
    if (this.appStateService.contacts.length < 1) {
      this.appStateService.contacts = await this.dataStorageService.getItem(
        'contacts.json'
      );
    }

    this.windowWidthService.getWindowWidth();
    this.getEveryFirstLetter();
  }

  updateContacts(contact: Contact) {
    this.firstLetters = [];
    this.changeDetectorRef.detectChanges();
    this.getEveryFirstLetter();
    this.selectedContact = contact;
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
