import { Component, OnInit, OnDestroy } from '@angular/core';
import { finalize, Subscription } from 'rxjs';

import { MessagesService } from 'src/app/shared/services/messages.service';
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
  ) {
    this.token = localStorage.getItem('access_token') || '';
    this.userId = localStorage.getItem('id') || '';
  }

  ngOnInit(): void {
    this.websocketService.connect(`${environment.baseUrlWs}?userId=${this.userId}&token=${this.token}`);
    this.messageSub = this.websocketService.onMessage().subscribe((msg) => {
      this.messages.push({ sender: 'bot', text: msg });
    });
    this.onRead();
  }

  ngOnDestroy(): void {
    this.websocketService.disconnect();
    this.messageSub?.unsubscribe();
  }

  selectContact(contact: any) {
    this.messages = [];
    this.messages.push({ sender: 'bot', text: `You have selected ${contact.username}` });
    this.selectedContact = contact;
    this.onReadMessages(this.userId, contact.id);
  }

  sendMessage(message) {
    if (message.trim()) {
      this.websocketService.sendMessage({
        toUserId: this.selectedContact.id,
        message: message
      });
      this.messages.push({ sender: 'me', text: message });
    }
  }

  onRead() {
    this.sharedService.openSpinner();
    this.userService.readAsync({
      page: 1,
      pageSize: 100,
      active: true,
    })
      .pipe(
        finalize(() => {
          this.sharedService.closeSpinner();
          this.sharedService.openedSidebarChat = true;
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
          this.sharedService.openedSidebarChat = true;
        })
      )
      .subscribe({
        next: (resp: any) => {
          console.log(resp);

          for (const message of resp.data) {
            if (message.senderId === senderId) {
              this.messages.push({ sender: 'me', text: message.message });
            } else {
              this.messages.push({ sender: 'bot', text: message.message });
            }
          }
        },
        error: (error: any) => {
          this.messagesService.errorHandler(error);
        }
      });
  }
}