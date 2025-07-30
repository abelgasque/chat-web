import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatChannelRoutingModule } from './chat-channel-routing.module';
import { ChatChannelComponent } from './chat-channel.component';


@NgModule({
  declarations: [ChatChannelComponent],
  imports: [
    CommonModule,
    ChatChannelRoutingModule
  ]
})
export class ChatChannelModule { }
