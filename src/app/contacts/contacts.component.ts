import { NgClass, NgStyle, UpperCasePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AddTaskOverlayComponent } from '../add-task/add-task-overlay/add-task-overlay.component';
import { ButtonPrimaryComponent } from '../customComponents/button-primary/button-primary.component';
import { LayoutComponent } from '../layout/layout.component';
import { WindowWidthService } from '../layout/window-width.service';
import { Contact } from '../models/contact.model';
import { AddTaskService } from '../services/add-task.service';
import { AppStateService } from '../services/app-state.service';
import { DataStorageService } from '../services/data-storage.service';
import { ContactDetailViewComponent } from './contact-detail-view/contact-detail-view.component';
import { AddContactComponent } from './contact-overlay/contact-overlay.component';
import { FilterPipe } from './filter.pipe';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  imports: [
    LayoutComponent,
    ContactDetailViewComponent,
    ButtonPrimaryComponent,
    NgClass,
    NgStyle,
    AddTaskOverlayComponent,
    AddContactComponent,
    UpperCasePipe,
    FilterPipe,
  ],
})
export class ContactsComponent implements OnInit {
  firstLetters: string[] = [];
  contactOverlayOpened: boolean = false;
  contactOverlayCloseAnimation: boolean = false;

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
    this.firstLetters = [];
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
    if (!this.contactOverlayOpened) {
      this.contactOverlayOpened = true;
    } else {
      this.contactOverlayCloseAnimation = true;

      setTimeout(() => {
        if (editMode) {
          this.editMode = editMode;
        } else {
          this.editMode = false;
        }

        this.contactOverlayCloseAnimation = false;
        this.contactOverlayOpened = false;
      }, 300);
    }
  }
}
