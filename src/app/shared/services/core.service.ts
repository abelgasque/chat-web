import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenDTO } from '../models/DTO/token.dto';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  public token: string;
  public refreshToken: string;
  public username: string;
  public email: string;

  constructor(
    private jwtHelperService: JwtHelperService,
  ) {
    this.token = this.getTokenLocalStorage();
    this.refreshToken = this.getRefreshTokenLocalStorage();
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
    this.refreshToken = token.refreshToken;

    const decodeToken = this.jwtHelperService.decodeToken(this.token);
    this.username = decodeToken.unique_name;
    this.email = decodeToken.email;

    localStorage.setItem('access_token', this.token);
    localStorage.setItem('refresh_token', this.refreshToken);
    localStorage.setItem('id', decodeToken?.nameid);
    localStorage.setItem('username', this.username);
    localStorage.setItem('email', this.email);
  }

  removeTokenLocalStorage() {
    this.token = '';
    this.refreshToken = '';
    this.username = '';
    this.email = '';

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
  }
}
