import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-sidebar-contact',
  templateUrl: './sidebar-contact.component.html',
  styleUrls: ['./sidebar-contact.component.scss']
})
export class SidebarContactComponent implements OnInit {

  @Input() contacts: any[] = [];

  public userId: string;

  constructor(public sharedService: SharedService) {
    this.userId = localStorage.getItem('id') || '';
  }

  ngOnInit(): void {}
}
