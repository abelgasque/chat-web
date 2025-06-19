import { Injectable } from '@angular/core';

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

  getTokenLocalStorage() {
    return localStorage.getItem('access_token') || '';
  }

  setTokenLocalStorage(token: TokenDTO) {
    this.token = token.access_token;
    this.refresh_token = token.refresh_token;

    const decodeToken = this.decodeToken(this.token);
    this.username = decodeToken.name;
    this.email = decodeToken.email;

    localStorage.setItem('access_token', this.token);
    localStorage.setItem('refresh_token', this.refresh_token);
    localStorage.setItem('username', this.username);
    localStorage.setItem('email', this.email);
  }

  removeTokenLocalStorage() {
    this.token = '';
    this.refresh_token = '';
    this.username = '';
    this.email = '';

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
  }

  private decodeToken(pToken: string) {
    return this.jwtHelperService.decodeToken(pToken);
  }

  private isTokenExpired(pToken: string) {
    return this.jwtHelperService.isTokenExpired(pToken);
  }

  public isValidToken(): boolean {
    let token: string = this.getTokenLocalStorage();
    return (token != null && token.length > 0) ? (!this.isTokenExpired(token)) : false;
  }
}
