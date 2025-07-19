import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/shared/models/user.interface';
import { UserService } from 'src/app/shared/services/user.service';
import { MessagesService } from 'src/app/shared/services/messages.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public tabLabel = "Create";
  public selectedTabIndex = 0;
  public users: [] = [];
  public user: any;

  constructor(
    private service: UserService,
    private messagesService: MessagesService
  ) { }

  ngOnInit(): void {
    this.user = null;
    this.onRead(null);
  }

  setTab(index, title) {
    this.selectedTabIndex = index;
    this.tabLabel = title;
  }

  onRead(filter: any) {
    this.service.readAsync().subscribe({
      next: (resp: any) => {
        this.users = resp;
      },
      error: (error: any) => {
        this.messagesService.errorHandler(error);
      }
    })
  }

  onReadById(id: string) {
    this.service.readByIdAsync(id).subscribe({
      next: (resp: User) => {
        this.user = resp;
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
