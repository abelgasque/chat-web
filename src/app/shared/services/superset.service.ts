import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SupersetService {

  
  public baseUrl: string = "https://localhost:8088";

  constructor(private http: HttpClient) { }

  accessToken() {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.baseUrl}/api/v1/security/login`, {
      "username": "admin",
      "password": "admin",
      "provider": "db",
      "refresh": true
    }, { headers });
  }

  guestToken(accessToken: string) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    });
    return this.http.post(`${this.baseUrl}/api/v1/security/guest`, { headers });
  }
}
