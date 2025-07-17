import { Component } from '@angular/core';
import { CoreService } from 'src/app/shared/services/core.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  public dashboardId: string;
  public menuItems: any[];
  public user: any[];

  constructor(
    public coreService: CoreService,
    public sharedService: SharedService
  ) {
    this.dashboardId = environment.supersetConfig.adminId;

    this.user = [
      { label: 'username', value: this.coreService.username },
      { label: 'email', value: this.coreService.email },
    ];

    this.menuItems = [
      // { label: 'Bot', icon: 'android', route: '/bot' },
      // { label: 'Channel', icon: 'chat', route: '/channel' },
      // { label: 'Dashboard', icon: 'dashboards', route: '/dashboard' },
      { label: 'Tenant', icon: 'manage_accounts', route: '/tenant' },
      { label: 'User', icon: 'peoples', route: '/user' },
    ];
  }
}
