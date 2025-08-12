import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { finalize, Subscription } from 'rxjs';

import { environment } from 'src/environments/environment';
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ChatService } from 'src/app/shared/services/chat.service';

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
  public user: any = undefined;
  public chat: any;

  constructor(
    private route: ActivatedRoute,
    private websocketService: WebsocketService,
    private sharedService: SharedService,
    private messagesService: MessagesService,
    private userService: UserService,
    private chatService: ChatService,
  ) {
    this.route.paramMap.subscribe(params => {
      this.token = localStorage.getItem('access_token') || '';
      this.senderId = localStorage.getItem('id') || '';
      this.receiverId = params.get('id') || '';
      this.messages = [];

      this.onReadUser();
      this.onReadChat();

      if (!this.chat) {
        this.createChat();
      }

      this.websocketService.connect(`${environment.baseUrlWs}?userId=${this.senderId}&token=${this.token}`);
      this.messageSub = this.websocketService.onMessage().subscribe((msg) => { });
    });
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.websocketService.disconnect();
    this.messageSub?.unsubscribe();
  }

  sendMessage(message) {
    if (message.trim()) {
      this.websocketService.sendMessage({
        chatId: this.chat.id,
        receiverId: this.receiverId,
        message: message
      });
      this.messages.push({
        chatId: this.chat.id,
        receiverId: this.receiverId,
        senderId: this.senderId,
        message: message,
        sentAt: new Date(),
      });
    }
  }

  onReadUser() {
    this.sharedService.openSpinner();
    this.userService.readByIdAsync(this.receiverId)
      .pipe(
        finalize(() => {
          this.sharedService.closeSpinner();
        })
      )
      .subscribe({
        next: (resp: any) => {
          this.user = resp;
        },
        error: (error: any) => {
          this.messagesService.errorHandler(error);
        }
      });
  }

  onReadChat() {
    this.sharedService.openSpinner();
    this.chatService.readByIdAsync(this.senderId, this.receiverId)
      .pipe(
        finalize(() => {
          this.sharedService.closeSpinner();
        })
      )
      .subscribe({
        next: (resp: any) => {
          if (resp.data.length > 0) {
            this.chat = resp.data[0];

            if (this.chat.messages) {
              this.messages = this.chat.messages;
            }
            return;
          }
        },
        error: (error: any) => {
          this.messagesService.errorHandler(error);
        }
      });
  }

  createChat() {
    this.sharedService.openSpinner();
    this.chatService.createAsync({
      name: this.user.name,
      senderId: this.senderId,
      receiverId: this.receiverId,
      messages: []
    })
      .pipe(
        finalize(() => {
          this.sharedService.closeSpinner();
        })
      )
      .subscribe({
        next: (resp: any) => {
          console.log(resp);
          this.chat = resp;
        },
        error: (error: any) => {
          this.messagesService.errorHandler(error);
        }
      });
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
