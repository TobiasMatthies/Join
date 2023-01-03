import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WindowWidthService {
  constructor(public router: Router) { }

  getWindowWidth(): number {
       let windowWidth: number = window.innerWidth;
       return windowWidth;
  }
}
