import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupersetService {

  private baseUrl: string;
  private headers: HttpHeaders;
  public supersetUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.baseUrlApi}/api/superset/guest_token`;
    this.supersetUrl = environment.supersetConfig.url;
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    });
  }

  guestToken(id: string, clauses: []) {
    return this.http.post(this.baseUrl, {
      id: id, clauses: clauses
    }, { headers: this.headers });
  }
}
