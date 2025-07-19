import { formatDate } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { User } from '../models/user.interface';
import { UserFilter } from '../models/filters/user.filter';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string;

  constructor(
    private http: HttpClient,
    private coreService: CoreService
  ) {
    this.baseUrl = `${environment.baseUrlApi}/user`;
  }

  createAsync(entity: User) {
    const headers = this.coreService.setHeadersBearer();
    return this.http.post<any>(`${this.baseUrl}`, entity, { headers });
  }

  readAsync() {
    const headers = this.coreService.setHeadersBearer();
    return this.http.get<any>(`${this.baseUrl}`, { headers });
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

    const headers = this.coreService.setHeadersBearer();
    return this.http.get<any>(`${this.baseUrl}`, { headers, params });
  }

  readByIdAsync(id: string) {
    const headers = this.coreService.setHeadersBearer();
    return this.http.get<any>(`${this.baseUrl}/${id}`, { headers });
  }

  updateAsync(entity: User) {
    const headers = this.coreService.setHeadersBearer();
    return this.http.put<any>(`${this.baseUrl}`, entity, { headers });
  }

  deleteByIdAsync(id: string) {
    const headers = this.coreService.setHeadersBearer();
    return this.http.delete<any>(`${this.baseUrl}/${id}`, { headers });
  }
}
