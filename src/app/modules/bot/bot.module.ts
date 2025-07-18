import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BotRoutingModule } from './bot-routing.module';
import { BotComponent } from './bot.component';


@NgModule({
  declarations: [
    BotComponent
  ],
  imports: [
    CommonModule,
    BotRoutingModule
  ]
})
export class BotModule { }
