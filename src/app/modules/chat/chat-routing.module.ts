import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat.component';

const routes: Routes = [
  {
    path: '',
    component: ChatComponent,
    children: [
      {
        path: 'user/:id',
        loadChildren: () => import('src/app/modules/chat/components/chat-user/chat-user.module').then(m => m.ChatUserModule)
      },
      {
        path: 'channel/:id',
        loadChildren: () => import('src/app/modules/chat/components/chat-channel/chat-channel.module').then(m => m.ChatChannelModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
