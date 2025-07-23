import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { WebsocketService } from 'src/app/shared/services/websocket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  contacts = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Carlos' }
  ];

  selectedContact: any;
  messages: any[] = [];

  private messageSub?: Subscription;

  constructor(private websocketService: WebsocketService) {}

  ngOnInit(): void {
    this.websocketService.connect(environment.baseUrlWs);
    this.messageSub = this.websocketService.onMessage().subscribe((msg) => {
      this.messages.push({ sender: 'bot', text: msg });
    });
  }

  ngOnDestroy(): void {
    this.websocketService.disconnect();
    this.messageSub?.unsubscribe();
  }

  selectContact(contact: any) {
    this.selectedContact = contact;
  }

  sendMessage(message) {
    if (message.trim()) {
      this.websocketService.sendMessage(message);
      this.messages.push({ sender: 'me', text: message });
    }
  }
}