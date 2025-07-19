import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

    private baseUrl: string;
  
    constructor(
      private http: HttpClient,
      private coreService: CoreService
    ) {
      this.baseUrl = `${environment.baseUrlApi}/tenant`;
    }
  
    createAsync(entity: any) {
      const headers = this.coreService.setHeadersBearer();
      return this.http.post<any>(`${this.baseUrl}`, entity, { headers });
    }
  
    readAsync() {
      const headers = this.coreService.setHeadersBearer();
      return this.http.get<any>(`${this.baseUrl}`, { headers });
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
