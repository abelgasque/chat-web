import { formatDate } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { User } from '../models/user.interface';
import { UserFilter } from '../models/filters/user.filter';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string;
  private headers: any;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.baseUrlApi}/api/user`;
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    });
  }

  createAsync(entity: User) {
    return this.http.post<any>(`${this.baseUrl}`, entity, { headers: this.headers });
  }

  readAsync() {
    return this.http.get<any>(`${this.baseUrl}`, { headers: this.headers });
  }
  readFilterAsync(filter: UserFilter) {
    let params = new HttpParams({
      fromObject: {
        page: filter.page.toString(),
        size: filter.size.toString()
      }
    });

    if (filter.name) {
      params = params.append('name', filter.name);
    }

    if (filter.email) {
      params = params.append('email', filter.email);
    }

    if (filter.createdAtStart && filter.createdAtEnd) {
      params = params.append('createdAtStart', formatDate(filter.createdAtStart, 'yyyy-MM-dd', 'en').toString());
      params = params.append('createdAtEnd', formatDate(filter.createdAtEnd, 'yyyy-MM-dd', 'en').toString());
    }

    return this.http.get<any>(`${this.baseUrl}`, { headers: this.headers, params });
  }

  readByIdAsync(id: string) {
    return this.http.get<any>(`${this.baseUrl}/${id}`, { headers: this.headers });
  }

  updateAsync(entity: User) {
    return this.http.put<any>(`${this.baseUrl}`, entity, { headers: this.headers });
  }

  deleteByIdAsync(id: string) {
    return this.http.delete<any>(`${this.baseUrl}/${id}`, { headers: this.headers });
  }
}
