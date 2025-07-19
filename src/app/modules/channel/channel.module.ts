import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

import { ChannelRoutingModule } from './channel-routing.module';
import { ChannelComponent } from './channel.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ChannelComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    ChannelRoutingModule,
    SharedModule,
  ]
})
export class ChannelModule { }
