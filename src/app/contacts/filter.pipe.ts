import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../models/contact.model';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(contacts: Contact[], filter: string): Contact[] {
    if (!contacts) {
      return [];
    }
    return contacts.filter((contact) => contact.name.charAt(0) === filter);
  }
}
