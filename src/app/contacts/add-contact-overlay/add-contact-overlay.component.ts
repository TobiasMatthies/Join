import { Component, EventEmitter, Output } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'app-add-contact-overlay',
  templateUrl: './add-contact-overlay.component.html',
  styleUrls: ['./add-contact-overlay.component.css']
})
export class AddContactComponent {
  @Output() closeOverlay= new EventEmitter<void>();
  @Output() createContact = new EventEmitter<Contact>();

  onCloseOverlay() {
    this.closeOverlay.emit();
    //clear the form
  }

  onCreateContact() {
    console.log('contact created');
    //clear the form
    this.onCloseOverlay();
  }
}
