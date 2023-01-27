import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AppStateService } from './app-state.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private httpClient: HttpClient,
    private appStateService: AppStateService
  ) {}

  async fetchData() {
    this.appStateService.tasks = await this.getItem('tasks.json');
    this.appStateService.contacts = await this.getItem('contacts.json');
    this.appStateService.categories = await this.getItem('categories.json');
  }

  setItem(item: Object, endpoint: string) {
    this.httpClient
      .put('https://join-12c12-default-rtdb.firebaseio.com/' + endpoint, item)
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  async getItem(endpoint: string): Promise<any> {
    let item = await firstValueFrom(
      this.httpClient.get(
        'https://join-12c12-default-rtdb.firebaseio.com/' + endpoint
      )
    );
    return item;
  }
}
