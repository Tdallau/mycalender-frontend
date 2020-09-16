import { ResponseItem, ResponseError } from './../_models/responseType';
import { LoadingService } from './loading.service';
import { tap, catchError } from 'rxjs/operators';
import { LoginResponse, TokenSettings } from './../_models/Authorization/loginResponse';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import LoginRequest from '../_models/Authorization/loginRequest';
import RegisterRequest from '../_models/Authorization/registerRequest';
import LocalStorageHelper from '../_helpers/LocalStorageHelper';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://mycalender.dallau.com/authorization/';
  // private baseUrl = 'http://0.0.0.0:8080/';
  private token: TokenSettings | null = null;
  public $tokenObservable = new BehaviorSubject<TokenSettings>(this.token);

  constructor(private http: HttpClient, private router: Router, private loadingService: LoadingService) {
    this.token = LocalStorageHelper.getItem<TokenSettings>('token');
    this.$tokenObservable.next(this.token);
  }

  login(credentials: LoginRequest): Observable<ResponseItem<LoginResponse> | ResponseError> {
    // this.router.navigate(['/home']);
    return this.http.post(`${this.baseUrl}login`, credentials).pipe(
      tap((response: ResponseItem<LoginResponse> | ResponseError) => {
        if (response.success) {
          const user = response.data;
          LocalStorageHelper.SetItem('token', user.tokenSettings);
          this.token = LocalStorageHelper.getItem<TokenSettings>('token');
          this.$tokenObservable.next(this.token);
        }
      }),
      catchError((err, obj) => {
        return of(null);
      })
    );
  }

  register(newUser: RegisterRequest) {
    this.http.post<ResponseItem<unknown> | ResponseError>(`${this.baseUrl}register`,
      newUser).subscribe((res) => {
        this.loadingService.setloading(false);
      });
  }

  getLogin(newToken = false): Observable<ResponseItem<TokenSettings> | ResponseError> {
    if (!this.token) { return of(null); }
    const now = new Date();
    const expDate = new Date(new Date(1970, 0, 1).setSeconds(+this.token.exp + now.getTimezoneOffset() * -60));
    if (this.token && expDate > now) {
      return of({ data: this.token, success: true });
    } else {
      console.log('token is verlopen');
      return this.loginWithRefreshToken();
    }
  }

  loginWithRefreshToken(): Observable<ResponseItem<TokenSettings> | ResponseError> {
    return this.http.post<ResponseItem<TokenSettings> | ResponseError>(`${this.baseUrl}refresh`, {
      JWTToken: this.token.jwtToken,
      refreshToken: this.token.refreshToken
    });
  };

  updateToken(tokenSettings: TokenSettings) {
    this.token = tokenSettings;
    this.$tokenObservable.next(this.token);
    LocalStorageHelper.SetItem('token', this.token);
  }

  logout() {
    if (this.token) {
      this.http.post(`${this.baseUrl}logout`, {
        JWTToken: this.token.jwtToken,
        refreshToken: this.token.refreshToken
      }).subscribe(_ => {
        this.token = undefined;
        localStorage.removeItem('token');
        this.$tokenObservable.next(this.token);
        setTimeout(_ => {
          this.router.navigate(['/']);
        }, 500);
      });
    }
  }
}