import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';

import { MessagesService } from 'src/app/shared/services/messages.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public contacts: any[];

  constructor(
    private userService: UserService,
    private messagesService: MessagesService,
    public sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this.onRead();
  }

  onRead() {
    this.sharedService.openSpinner();
    this.userService.readAsync({
      page: 1,
      pageSize: 25,
      active: true,
    })
      .pipe(
        finalize(() => {
          this.sharedService.closeSpinner();
        })
      )
      .subscribe({
        next: (resp: any) => {
          this.contacts = resp.data;
        },
        error: (error: any) => {
          this.messagesService.errorHandler(error);
        }
      });
  }
}