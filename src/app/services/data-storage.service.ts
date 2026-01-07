import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { firstValueFrom, take } from 'rxjs';
import { User } from '../models/user.model';
import { AppStateService } from './app-state.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  authService: AuthService;
  user: User;

  constructor(
    private httpClient: HttpClient,
    private appStateService: AppStateService,
    private injector: Injector,
  ) {}

  /**
   * auth Service get's injected with injector to avoid circular dependency
   * all data required for the app to work gets fetched
   */
  async fetchData() {
    this.getCurrentUser();
    this.appStateService.tasks = await this.getItem('tasks.json');
    this.appStateService.contacts = await this.getItem('contacts.json');
    this.appStateService.categories = await this.getItem('categories.json');
  }

  /**
   * the user observable gets taken once and the user is set.
   * After that, the subscription is automatically destroyed
   */
  getCurrentUser() {
    this.authService = this.injector.get(AuthService);
    this.authService.user.pipe(take(1)).subscribe((user) => {
      this.user = user;
    });
  }

  setItem(item: Object, endpoint: string) {
    this.httpClient
      .put('https://join-12c12-default-rtdb.firebaseio.com/' + endpoint, item, {
        params: new HttpParams().set('auth', this.user.token),
      })
      .subscribe();
  }

  /**
   *
   * @param endpoint the endpoint where the data get's fetched from
   *  get an item at the given endpoint and wait until the promise get's resolved
   * return the result
   */
  async getItem(endpoint: string, skipAuth: boolean = false): Promise<any> {
    let params = skipAuth
      ? {}
      : {
          params: new HttpParams().set('auth', this.user.token),
        };

    let item = await firstValueFrom(
      this.httpClient.get(
        'https://join-12c12-default-rtdb.firebaseio.com/' + endpoint,
        params,
      ),
    );
    return item;
  }
}
