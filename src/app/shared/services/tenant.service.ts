import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { CoreService } from './core.service';
import { PaginationDTO } from '../models/DTO/pagination.dto';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  private baseUrl: string;

  constructor(
    private http: HttpClient,
    private coreService: CoreService
  ) {
    this.baseUrl = `${environment.baseUrlApi}/v1/api/tenant`;
  }

  createAsync(entity: any) {
    const headers = this.coreService.setHeadersBearer();
    return this.http.post<any>(`${this.baseUrl}`, entity, { headers });
  }

  readAsync(filter: PaginationDTO) {
    let params = new HttpParams({
      fromObject: {
        page: filter.page.toString(),
        pageSize: filter.pageSize.toString()
      }
    });

    const headers = this.coreService.setHeadersBearer();
    return this.http.get<any>(`${this.baseUrl}`, { headers, params });
  }

  readByIdAsync(id: string) {
    const headers = this.coreService.setHeadersBearer();
    return this.http.get<any>(`${this.baseUrl}/${id}`, { headers });
  }

  updateAsync(entity: any) {
    const headers = this.coreService.setHeadersBearer();
    return this.http.put<any>(`${this.baseUrl}`, entity, { headers });
  }

  deleteByIdAsync(id: string) {
    const headers = this.coreService.setHeadersBearer();
    return this.http.delete<any>(`${this.baseUrl}/${id}`, { headers });
  }
}
