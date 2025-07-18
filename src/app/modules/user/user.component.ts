import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/shared/models/user.interface';
import { UserService } from 'src/app/shared/services/user.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public users: [];
  public user: any;

  constructor(
    private userService: UserService,
    private sharedService: SharedService,
    private messagesService: MessagesService
  ) { }

  ngOnInit(): void {
    this.read();
  }

  read() {
    this.userService.readAsync().subscribe({
      next: (resp: any) => {
        this.users = resp;
      },
      error: (error: any) => {
        this.messagesService.errorHandler(error);
      }
    })
  }

  readById(id: string) {
    this.sharedService.openSpinner();
    this.userService.readByIdAsync(id).subscribe({
      next: (resp: User) => {
        this.sharedService.closeSpinner();
      },
      error: (error: any) => {
        this.messagesService.errorHandler(error);
      }
    })
  }

  delete(id: string) {
    this.sharedService.openSpinner();
    this.userService.deleteByIdAsync(id).subscribe({
      next: (resp: any) => {
        this.read();
        this.sharedService.closeSpinner();
      },
      error: (error: any) => {
        this.messagesService.errorHandler(error);
      }
    })
  }

}
