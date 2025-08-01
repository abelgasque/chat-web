import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { UserDTO } from '../models/DTO/user.dto';
import { RefreshTokenDTO } from '../models/DTO/refreshToken.dto';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private baseUrl: string;

  constructor(
    private http: HttpClient,
  ) {
    this.baseUrl = `${environment.baseUrlApi}/v1/api/token`;
  }

  signIn(user: UserDTO) {
    return this.http.post<any>(`${this.baseUrl}`, user);
  }

  refresh(refreshToken: RefreshTokenDTO) {
    return this.http.post<any>(`${this.baseUrl}/refresh`, refreshToken);
  }
}
