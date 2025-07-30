import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatUserModule } from './components/chat-user/chat-user.module';
import { ChatChannelModule } from './components/chat-channel/chat-channel.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChatComponent } from './chat.component';


@NgModule({
  declarations: [
    ChatComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,

    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,

    ChatRoutingModule,
    ChatUserModule,
    ChatChannelModule,
    SharedModule,
  ]
})
export class ChatModule { }
