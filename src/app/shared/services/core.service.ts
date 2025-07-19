import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenDTO } from '../models/DTO/token.dto';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  public token: string;
  public refresh_token: string;
  public username: string;
  public email: string;

  constructor(
    private jwtHelperService: JwtHelperService,
  ) {
    this.token = this.getTokenLocalStorage();
    this.refresh_token = localStorage.getItem('refresh_token') || '';
    this.username = localStorage.getItem('username') || '';
    this.email = localStorage.getItem('email') || '';
  }

  setHeadersBearer() {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.getTokenLocalStorage()}`
    });
  }

  getTokenLocalStorage() {
    return localStorage.getItem('access_token') || '';
  }

  getRefreshTokenLocalStorage() {
    return localStorage.getItem('refresh_token') || '';
  }

  setTokenLocalStorage(token: TokenDTO) {
    this.token = token.accessToken;
    this.username = token.data.username;
    this.email = token.data.email;

    localStorage.setItem('token', this.token);
    localStorage.setItem('access_token', this.token);
    localStorage.setItem('username', this.username);
    localStorage.setItem('email', this.email);
  }

  removeTokenLocalStorage() {
    this.token = '';
    this.refresh_token = '';
    this.username = '';
    this.email = '';

    localStorage.removeItem('token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
  }
}
