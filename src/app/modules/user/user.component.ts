import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/shared/models/user.interface';
import { UserService } from 'src/app/shared/services/user.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public tabLabel = "Create";
  public selectedTabIndex = 0;
  public columns: any[];
  public users: any[] = [];
  public user: any;

  constructor(
    private service: UserService,
    private sharedService: SharedService,
    private messagesService: MessagesService
  ) { }

  ngOnInit(): void {
    this.columns = [
      { name: 'name', label: 'Name' },
      { name: 'email', label: 'email' },
      { name: 'createdAt', label: 'Date Create' },
      { name: 'activeAt', label: 'Date Active' },
      { name: 'loggedAt', label: 'Date Login' },
    ];

    this.onRead(null);
  }

  setTab(index, title) {
    this.selectedTabIndex = index;
    this.tabLabel = title;
  }

  onRead(filter: any) {
    this.sharedService.openSpinner();
    this.service.readAsync()
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
          this.onRead(null);
        },
        error: (error: any) => {
          this.messagesService.errorHandler(error);
        }
      });
  }

}
