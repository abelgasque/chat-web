import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,

    MatSidenavModule,
    MatListModule,
    MatIconModule,

    ChatRoutingModule,
    SharedModule,
  ]
})
export class ChatModule { }
