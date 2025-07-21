import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { TenantService } from 'src/app/shared/services/tenant.service';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.scss']
})
export class TenantComponent implements OnInit {

  public tabLabel = "Create";
  public selectedTabIndex = 0;
  public tenants: any = [];
  public tenant: any = null;

  constructor(
    private service: TenantService,
    private messagesService: MessagesService
  ) { }

  ngOnInit(): void {
    this.onRead(null);
  }

  setTab(index, title) {
    this.selectedTabIndex = index;
    this.tabLabel = title;
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

  onReadById(id: string) {
    this.service.readByIdAsync(id).subscribe({
      next: (resp: any) => {
        this.tenant = resp;
        this.setTab(1, "Edit");
      },
      error: (error: any) => {
        this.messagesService.errorHandler(error);
      }
    })
  }

  onDelete(id: string) {
    this.service.deleteByIdAsync(id).subscribe({
      next: (resp: any) => {
        this.onRead(null);
      },
      error: (error: any) => {
        this.messagesService.errorHandler(error);
      }
    })
  }
}
