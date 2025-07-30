import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatUserRoutingModule } from './chat-user-routing.module';
import { ChatUserComponent } from './chat-user.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ChatUserComponent],
  imports: [
    CommonModule,

    ChatUserRoutingModule,
    SharedModule,
  ]
})
export class ChatUserModule { }
