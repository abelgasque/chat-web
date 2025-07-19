import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/shared/services/user.service';
import { MessagesService } from 'src/app/shared/services/messages.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public users: [] = [];

  constructor(
    private userService: UserService,
    private messagesService: MessagesService
  ) { }

  ngOnInit(): void {
    this.onRead(null);
  }

  onRead(filter: any) {
    this.userService.readAsync().subscribe({
      next: (resp: any) => {
        this.users = resp;
      },
      error: (error: any) => {
        this.messagesService.errorHandler(error);
      }
    })
  }
}
