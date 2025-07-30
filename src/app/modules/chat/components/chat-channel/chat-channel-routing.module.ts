import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChatChannelComponent } from './chat-channel.component';

const routes: Routes = [
  { path: '', component: ChatChannelComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatChannelRoutingModule { }
