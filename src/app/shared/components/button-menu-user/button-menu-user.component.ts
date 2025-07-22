import { Component, OnInit } from '@angular/core';

import { CoreService } from '../../services/core.service';
import { SharedService } from '../../services/shared.service';
import { SecurityService } from '../../services/security.service';

@Component({
  selector: 'app-button-menu-user',
  templateUrl: './button-menu-user.component.html',
  styleUrls: ['./button-menu-user.component.scss']
})
export class ButtonMenuUserComponent implements OnInit {

  public user: any[];

  constructor(
    public coreService: CoreService,
    public sharedService: SharedService,
    public securityService: SecurityService,
  ) {
    this.user = [
      { label: 'username', value: this.coreService.username },
      { label: 'email', value: this.coreService.email },
    ];

  }

  ngOnInit(): void {

  }
}
