import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import { MessagesService } from 'src/app/shared/services/messages.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { UserService } from 'src/app/shared/services/user.service';
import { WebsocketService } from 'src/app/shared/services/websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(
    private router: Router,
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
          this.sharedService.contacts = resp.data;
        },
        error: (error: any) => {
          this.messagesService.errorHandler(error);
        }
      });
  }
}