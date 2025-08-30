import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

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
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatTabsModule,

    UserRoutingModule,
    SharedModule,
  ],
  providers: [
    AuthGuard,
    MessagesService
  ]
})
export class UserModule { }
