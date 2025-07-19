import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { TenantService } from 'src/app/shared/services/tenant.service';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.scss']
})
export class TenantComponent implements OnInit {

  public tenants: [] = [];

  constructor(
    private service: TenantService,
    private messagesService: MessagesService
  ) { }

  ngOnInit(): void {
    this.onRead(null);
  }

  onRead(filter: any) {
    this.service.readAsync().subscribe({
      next: (resp: any) => {
        this.tenants = resp;
      },
      error: (error: any) => {
        this.messagesService.errorHandler(error);
      }
    })
  }
}
