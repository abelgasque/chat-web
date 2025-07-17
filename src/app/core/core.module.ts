import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { MessagesService } from '../shared/services/messages.service';
import { SharedModule } from '../shared/shared.module';
import { HomeModule } from '../modules/home/home.module';
import { SecurityModule } from '../modules/security/security.module';
import { UserModule } from '../modules/user/user.module';

@NgModule({
  declarations: [
    CoreComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

    MatSidenavModule,

    CoreRoutingModule,
    SharedModule,
    HomeModule,
    SecurityModule,
    UserModule,
  ],
  providers: [
    AuthGuard,
    MessagesService,
  ]
})
export class CoreModule { }
