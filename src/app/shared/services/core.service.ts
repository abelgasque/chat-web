import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  public token: string;

  constructor(
    private jwtHelperService: JwtHelperService,
  ) {
    this.token = this.getTokenLocalStorage();
  }

  getTokenLocalStorage() {
    return localStorage.getItem('access_token') || '';
  }

  setTokenLocalStorage(token: string) {
    this.token = token;
    localStorage.setItem('access_token', this.token);
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
