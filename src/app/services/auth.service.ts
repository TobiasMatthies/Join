import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { DataStorageService } from './data-storage.service';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private dataStorageService: DataStorageService
  ) {}

  signup(email: string, password: string) {
    return this.httpClient
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBCYwEO4pmMK6U3htxFbNsyf5RJ3zZMttY',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errorRes) => {
          return this.returnError(errorRes);
        }),
        tap((resData: AuthResponseData) => {
          this.setUser(resData);
          this.router.navigate(['/summary']);
        })
      );
  }

  login(email: string, password: string) {
    return this.httpClient
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBCYwEO4pmMK6U3htxFbNsyf5RJ3zZMttY',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errorRes) => {
          return this.returnError(errorRes);
        }),
        tap((resData: AuthResponseData) => {
          this.setUser(resData);
          this.router.navigate(['/summary']);
        })
      );
  }

  private returnError(errorRes) {
    let errorMessage: string;

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }

    errorMessage = this.setErrorMessage(errorRes);
    return throwError(errorMessage);
  }

  setErrorMessage(errorRes) {
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        return 'This email already exists';
      case 'OPERATION_NOT_ALLOWED':
        return 'Password sign-in is disabled';
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        return 'We have blocked all requests from this device due to unusual activity. Try again later.';
      case 'EMAIL_NOT_FOUND':
        return 'Wrong email or password';
      case 'INVALID_PASSWORD':
        return 'Wrong email or password';
    }
    return 'An unknown error occured';
  }

  setUser(resData: AuthResponseData) {
    const expirationDate = new Date(
      new Date().getTime() + +resData.expiresIn * 1000
    );
    const user = this.createUser(resData, expirationDate);
    this.userLogin(user, +resData.expiresIn * 1000);
  }

  createUser(resData: AuthResponseData, expirationDate: Date): User {
    return new User(
      resData.email,
      resData.localId,
      resData.idToken,
      expirationDate
    );
  }

  /**
   *
   * emit and save the created user, load app data
   */
  userLogin(user: User, expirationDate: number) {
    this.autoLogout(expirationDate);
    this.user.next(user);
    localStorage.setItem('user', JSON.stringify(user));
    this.dataStorageService.fetchData();
  }

  autoLogin() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      return;
    }

    const loadedUser = this.createUserFromLocalStorage(user);
    const expirationDuration: number = new Date(user._tokenExpirationDate).getTime() - new Date().getTime();
    this.userLogin(loadedUser, expirationDuration);
  }

  createUserFromLocalStorage(user) {
    return new User(
      user.email,
      user.id,
      user._token,
      new Date(user._tokenExpirationDate)
    );
  }

  logout() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;

    this.user.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}
