import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';

import { SharedService } from 'src/app/shared/services/shared.service';
import { CoreService } from 'src/app/shared/services/core.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  public name: string;

  constructor(
    public router: Router,
    public coreService: CoreService,
    public sharedService: SharedService,
  ) {
    this.name = environment.name;
  }
}
