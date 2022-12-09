import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../app-state/app-state.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  //Variables for red green blue
  r;
  g;
  b;
  hsp;

  firstLetters: string[] = [];

  constructor(public appStateService: AppStateService) {}

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

  /**
   *
   * function used to chekc wether the color is dark or light and return the matching color
   */
  lightOrDark(color) {
    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {
      this.storeRgbValues(color);
    } else {
      this.convertToRgb(color);
    }

    return this.determineColor();
  }

  /**
   *
   * If RGB --> store the red, green, blue values in separate variables
   */
  storeRgbValues(color) {
    color = color.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
    );

    this.r = color[1];
    this.g = color[2];
    this.b = color[3];
  }

  /**
   *
   * If hex --> Convert it to RGB
   */
  convertToRgb(color) {
    color = +('0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));

    this.r = color >> 16;
    this.g = (color >> 8) & 255;
    this.b = color & 255;
  }

  /**
   *
   * determine wether the background-color is dark or light and return matching color
   */
  determineColor(): string {
    this.hsp = Math.sqrt(
      0.299 * (this.r * this.r) +
        0.587 * (this.g * this.g) +
        0.114 * (this.b * this.b)
    );
    if (this.hsp > 127.5) {
      return 'black';
    } else {
      return 'white';
    }
  }
}
