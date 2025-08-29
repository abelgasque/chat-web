import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';

import { PaginationDTO } from 'src/app/shared/models/DTO/pagination.dto';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { SharedService } from 'src/app/shared/services/shared.service';
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
  public columns: any[];
  public filters: PaginationDTO;

  constructor(
    private service: TenantService,
    private messagesService: MessagesService,
    private sharedService: SharedService,
  ) {
    this.columns = [
      { name: 'name', label: 'Name' },
      { name: 'database', label: 'Database' },
      { name: 'createdAt', label: 'Date Create' },
      { name: 'isActive', label: 'Active' },
    ];
  }

  ngOnInit(): void {
    this.filters = {
      page: 1,
      pageSize: 25,
    };
    this.onRead();
  }

  setTab(index, title) {
    this.selectedTabIndex = index;
    this.tabLabel = title;
  }

  handlePage(event: PaginationDTO) {
    this.filters = event;
    this.onRead();
  }

  onRead() {
    this.sharedService.openSpinner();
    this.service.readAsync(this.filters)
      .pipe(
        finalize(() => {
          this.sharedService.closeSpinner();
        })
      )
      .subscribe({
        next: (resp: any) => {
          console.log(resp);
          this.tenants = resp;
        },
        error: (error: any) => {
          this.messagesService.errorHandler(error);
        }
      });
  }

  onReadById(id: string) {
    this.sharedService.openSpinner();
    this.service.readByIdAsync(id)
      .pipe(
        finalize(() => {
          this.sharedService.closeSpinner();
        })
      )
      .subscribe({
        next: (resp: any) => {
          this.tenant = resp;
          this.setTab(1, "Edit");
        },
        error: (error: any) => {
          this.messagesService.errorHandler(error);
        }
      });
  }

  onDelete(id: string) {
    this.sharedService.openSpinner();
    this.service.deleteByIdAsync(id)
      .pipe(
        finalize(() => {
          const index = this.tenants.findIndex(item => item?.id === id);
          this.tenants.splice(index, 1);
        })
      )
      .subscribe({
        next: (resp: any) => {
          this.onRead();
        },
        error: (error: any) => {
          this.messagesService.errorHandler(error);
        }
      });
  }

}