import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { UserDTO } from '../models/DTO/user.dto';
import { RefreshTokenDTO } from '../models/DTO/refreshToken.dto';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private http: HttpClient,
  ) { }

  signIn(user: UserDTO) {
    return this.http.post<any>(`${environment.baseUrlApi}/token`, user);
  }

  refresh(refreshToken: RefreshTokenDTO) {
    return this.http.post<any>(`${environment.baseUrlApi}/token/refresh`, refreshToken);
  }
}
