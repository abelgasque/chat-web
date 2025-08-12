import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/shared/models/user.interface';
import { UserService } from 'src/app/shared/services/user.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { finalize } from 'rxjs';
import { PaginationDTO } from 'src/app/shared/models/DTO/pagination.dto';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public tabLabel = "Create";
  public selectedTabIndex = 0;
  public columns: any[];
  public users: any = [];
  public user: any;
  public filters: PaginationDTO;

  constructor(
    private service: UserService,
    private sharedService: SharedService,
    private messagesService: MessagesService,
  ) { }

  ngOnInit(): void {
    this.columns = [
      { name: 'avatarUrl', label: 'Avatar' },
      { name: 'username', label: 'Name' },
      { name: 'email', label: 'Email' },
      { name: 'createdAt', label: 'Date Create' },
      { name: 'isActive', label: 'Active' },
      { name: 'isBlock', label: 'Block' },
    ];

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
          this.users = resp;
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
        next: (resp: User) => {
          this.user = resp;
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
          const index = this.users.findIndex(item => item?.id === id);
          this.users.splice(index, 1);
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
