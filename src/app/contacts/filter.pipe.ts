import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../models/contact.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  filteredContacts: Contact[] = [];

  transform(contacts: Contact[], filter: string): Contact[] {
    for (let i = 0; i < contacts.length; i++) {
      const contact = contacts[i];

      if (contact.name.charAt(0) == filter) {
        this.filteredContacts.push(contact);
      }
    }
    return this.filteredContacts;
  }
}
