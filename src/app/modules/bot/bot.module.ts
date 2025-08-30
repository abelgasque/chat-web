import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { BotRoutingModule } from './bot-routing.module';
import { BotComponent } from './bot.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    BotComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatTabsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule,

    BotRoutingModule,
    SharedModule,
  ]
})
export class BotModule { }
