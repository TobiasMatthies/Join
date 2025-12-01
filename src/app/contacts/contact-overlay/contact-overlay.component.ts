import { NgClass, NgStyle } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Contact } from 'src/app/models/contact.model';
import { AppStateService } from 'src/app/services/app-state.service';
import { ButtonPrimaryComponent } from '../../customComponents/button-primary/button-primary.component';
import { DataStorageService } from '../../services/data-storage.service';

@Component({
  selector: 'app-contact-overlay',
  templateUrl: './contact-overlay.component.html',
  styleUrls: ['./contact-overlay.component.css'],
  imports: [NgClass, FormsModule, NgStyle, ButtonPrimaryComponent],
})
export class AddContactComponent implements OnInit {
  @ViewChild('contactForm', { static: false }) contactForm: NgForm;

  @Input() editMode: boolean;
  @Input() selectedContact: Contact;
  @Input() contactOverlayCloseAnimation: boolean;

  contact: Contact;
  selectedBackgroundColor: string;

  @Output() closeOverlay = new EventEmitter<void>();
  @Output() createContact = new EventEmitter<Contact>();
  @Output() editContact = new EventEmitter<Contact>();

  constructor(
    private appStateService: AppStateService,
    private dataStorageService: DataStorageService,
  ) {}

  ngOnInit(): void {
    if (this.selectedContact)
      this.selectedBackgroundColor = this.selectedContact.backgroundColor;
  }

  onCloseOverlay() {
    this.closeOverlay.emit();
  }

  onSubmit() {
    this.getFormValues();

    if (!this.editMode) this.onCreateContact();
    else this.onEditContact();
  }

  onCreateContact() {
    this.createContact.emit(this.contact);
    this.onCloseOverlay();
  }

  onEditContact() {
    let contactIndex = this.appStateService.contacts.findIndex(
      (c) =>
        c.email === this.selectedContact.email &&
        c.name === this.selectedContact.name &&
        c.phoneNumber === this.selectedContact.phoneNumber,
    );

    this.appStateService.contacts[contactIndex] = this.contact;
    this.selectedContact = this.contact;
    this.editContact.emit(this.selectedContact);
    this.onCloseOverlay();
  }

  getFormValues() {
    this.contact = {
      name:
        this.contactForm.form.value.name.charAt(0).toUpperCase() +
        this.contactForm.form.value.name.slice(1),
      email: this.contactForm.form.value.email,
      phoneNumber: this.contactForm.form.value.phoneNumber,
      abbrevation: this.getFirstCharacters(this.contactForm.form.value.name),
      backgroundColor: this.editMode
        ? this.selectedBackgroundColor
        : this.generateRandomColor(),
    };
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
    splittedName = splittedName.toString().toUpperCase();
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

  onSelectBackgroundColor(color: string) {
    this.selectedBackgroundColor = color;
  }
}
