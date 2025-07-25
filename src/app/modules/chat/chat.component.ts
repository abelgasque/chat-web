import { Component, OnInit, OnDestroy } from '@angular/core';
import { finalize, Subscription } from 'rxjs';

import { MessagesService } from 'src/app/shared/services/messages.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { UserService } from 'src/app/shared/services/user.service';
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  token: string;
  userId: string;
  contacts: any[] = [];

  selectedContact: any;
  messages: any[] = [];

  private messageSub?: Subscription;

  constructor(
    private websocketService: WebsocketService,
    private userService: UserService,
    private messagesService: MessagesService,
    public sharedService: SharedService,
    private notificationService: NotificationService,
  ) {
    this.token = localStorage.getItem('access_token') || '';
    this.userId = localStorage.getItem('id') || '';
  }

  ngOnInit(): void {
    this.websocketService.connect(`${environment.baseUrlWs}?userId=${this.userId}&token=${this.token}`);
    this.messageSub = this.websocketService.onMessage().subscribe((msg) => {
      this.notificationService.success(msg);
    });
    this.onRead();
  }

  ngOnDestroy(): void {
    this.websocketService.disconnect();
    this.messageSub?.unsubscribe();
  }

  toggleSidebarChat() {
    if (this.sharedService.openedSidebarContact) {
      this.selectedContact = undefined;
      this.messages = [];
    }
    this.sharedService.toggleSidebarChat();
  }

  selectContact(contact: any) {
    this.messages = [];
    this.selectedContact = contact;
    this.onReadMessages(this.userId, contact.id);
  }

  sendMessage(message) {
    if (message.trim()) {
      this.websocketService.sendMessage({
        toUserId: this.selectedContact.id,
        message: message
      });
      this.messages.push({
        senderId: this.userId,
        message: message,
        sentAt: new Date(),
      });
    }
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

  onReadMessages(senderId: string, receiverId: string) {
    this.sharedService.openSpinner();
    this.userService.readMessagesAsync({
      page: 1,
      pageSize: 25,
      senderId: senderId,
      receiverId: receiverId
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