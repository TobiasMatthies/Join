import { Component, OnInit } from '@angular/core';
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

  selectedContact: Contact = null;

  constructor(public appStateService: AppStateService, public addTaskService: AddTaskService) {}

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

  /**
   *
   * get the first character of the first name and the second name
   */
  getFirstCharacters(name: string) {
    let splittedName: any = name.split(' ');

    for (let i = 0; i < splittedName.length; i++) {
      splittedName[i] = splittedName[i].charAt(0);
    }
    splittedName = splittedName.toString();
    splittedName = splittedName.replace(',', '');
    return splittedName;
  }

  generateRandomColor() {
    let makeColorCode = '0123456789ABCDEF';
    let code = '#';

    for (let count = 0; count < 6; count++) {
      code = code + makeColorCode[Math.floor(Math.random() * 16)];
    }

    return code;
  }

  toggleAddContactOverlay() {
    this.addContactOverlayOpened = !this.addContactOverlayOpened;
  }
}
