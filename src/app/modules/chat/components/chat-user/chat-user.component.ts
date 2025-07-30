import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { finalize, Subscription } from 'rxjs';

import { environment } from 'src/environments/environment';
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.scss']
})
export class ChatUserComponent implements OnInit, OnDestroy {

  private token: string;
  private messageSub?: Subscription;
  public senderId: string;
  public receiverId: string;
  public messages: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private websocketService: WebsocketService,
    private notificationService: NotificationService,
    private sharedService: SharedService,
    private messagesService: MessagesService,
    private userService: UserService,
  ) {
    this.route.paramMap.subscribe(params => {
      this.token = localStorage.getItem('access_token') || '';
      this.senderId = localStorage.getItem('id') || '';
      this.receiverId = params.get('id') || '';
      this.onReadMessages();
    });
  }
  
  ngOnInit(): void {
    this.receiverId = this.route.snapshot.paramMap.get('id') || '';
    this.senderId = localStorage.getItem('id') || '';
    this.token = localStorage.getItem('access_token') || '';
    this.onReadMessages();

    this.websocketService.connect(`${environment.baseUrlWs}?userId=${this.senderId}&token=${this.token}`);
    this.messageSub = this.websocketService.onMessage().subscribe((msg) => {
      this.notificationService.success(msg);
    });
  }

  ngOnDestroy(): void {
    this.websocketService.disconnect();
    this.messageSub?.unsubscribe();
  }

  sendMessage(message) {
    if (message.trim()) {
      this.websocketService.sendMessage({
        toUserId: this.senderId,
        message: message
      });
      this.messages.push({
        senderId: this.senderId,
        message: message,
        sentAt: new Date(),
      });
    }
  }

  onReadMessages() {
    this.sharedService.openSpinner();
    this.userService.readMessagesAsync({
      page: 1,
      pageSize: 25,
      senderId: this.senderId,
      receiverId: this.receiverId
    })
      .pipe(
        finalize(() => {
          this.sharedService.closeSpinner();
        })
      )
      .subscribe({
        next: (resp: any) => {
          for (const message of resp.data) {
            this.messages.unshift(message);
          }
        },
        error: (error: any) => {
          this.messagesService.errorHandler(error);
        }
      });
  }
}
