import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../models/contact.model';

@Pipe({
    name: 'filter',
    standalone: true,
})
export class FilterPipe implements PipeTransform {
  filteredContacts: Contact[] = [];

  transform(contacts: Contact[], filter: string): Contact[] {
    for (let i = 0; i < contacts.length; i++) {
      const contact = contacts[i];

      if (
        contact.name.charAt(0) == filter &&
        this.contactIsNotIncluded(contact)
      ) {
        this.filteredContacts.push(contact);
      }
    }
    console.log(this.filteredContacts);
    return this.filteredContacts;
  }

  /**
   * 
   * function used to prevent contact from being added twice when contacts section gets reloaded
   */
  contactIsNotIncluded(contact: Contact) {
    for (let i = 0; i < this.filteredContacts.length; i++) {
      const element = this.filteredContacts[i];

      if (element.name == contact.name) {
        return false
      }
    }

    return true;
  }
}
