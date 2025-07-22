import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../shared/guards/auth.guard';

import { PageRedirectComponent } from '../shared/pages/page-redirect/page-redirect.component';
import { CoreComponent } from './core.component';

const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/modules/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'security',
        loadChildren: () => import('src/app/modules/security/security.module').then(m => m.SecurityModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('src/app/modules/superset/superset.module').then(m => m.SupersetModule)
      },
      {
        path: 'user',
        //canActivate: [AuthGuard],
        loadChildren: () => import('src/app/modules/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'tenant',
        //canActivate: [AuthGuard],
        loadChildren: () => import('src/app/modules/tenant/tenant.module').then(m => m.TenantModule)
      },
      {
        path: 'channel',
        //canActivate: [AuthGuard],
        loadChildren: () => import('src/app/modules/channel/channel.module').then(m => m.ChannelModule)
      },
      {
        path: 'bot',
        //canActivate: [AuthGuard],
        loadChildren: () => import('src/app/modules/bot/bot.module').then(m => m.BotModule)
      },
      {
        path: 'chat',
        //canActivate: [AuthGuard],
        loadChildren: () => import('src/app/modules/chat/chat.module').then(m => m.ChatModule)
      },
      { path: 'page-not-found', component: PageRedirectComponent },
      { path: 'page-not-authorized', component: PageRedirectComponent },
      { path: '', redirectTo: '', pathMatch: 'full' },
      { path: '**', redirectTo: 'page-not-found' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
