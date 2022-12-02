import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChooseUrgencyService {
  urgency;
  constructor() {}

  chooseUrgency(urgency: string) {
    this.urgency = urgency;
  }
}
