import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppStateService } from 'src/app/app-state/app-state.service';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'app-contact-overlay',
  templateUrl: './contact-overlay.component.html',
  styleUrls: ['./contact-overlay.component.css'],
})
export class AddContactComponent {
  @ViewChild('contactForm', { static: false }) contactForm: NgForm;

  contact: Contact;

  @Input() editMode: boolean;
  @Input() selectedContact: Contact;
  @Output() closeOverlay = new EventEmitter<void>();
  @Output() createContact = new EventEmitter<Contact>();

  constructor(private appStateService: AppStateService) {}

  onCloseOverlay() {
    this.closeOverlay.emit();
    //clear the form
  }

  onSubmit() {
    this.getFormValues();

    if (!this.editMode) this.onCreateContact();
    else this.onEditContact();
  }

  onCreateContact() {
    this.appStateService.contacts.push(this.contact);
    this.createContact.emit();
    this.onCloseOverlay();
  }

  onEditContact() {
    this.appStateService.contacts[
      this.appStateService.contacts.indexOf(this.selectedContact)
    ] = this.contact;

    this.onCloseOverlay();
  }

  getFormValues() {
    this.contact = {
      name: this.contactForm.form.value.name.charAt(0).toUpperCase() + this.contactForm.form.value.name.slice(1),
      email: this.contactForm.form.value.email,
      phoneNumber: this.contactForm.form.value.phoneNumber,
      abbrevation: this.getFirstCharacters(this.contactForm.form.value.name),
      backgroundColor: this.editMode
        ? this.selectedContact.backgroundColor
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
}
