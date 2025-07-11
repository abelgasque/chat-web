import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';

import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatTabsModule,
    SharedModule,
  ],
  providers: [
    AuthGuard,
    MessagesService
  ]
})
export class UserModule { }
