import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-sidebar-contact',
  templateUrl: './sidebar-contact.component.html',
  styleUrls: ['./sidebar-contact.component.scss']
})
export class SidebarContactComponent implements OnInit {

  @Input() contacts: any[] = [];
  @Input() selectedContact: any;

  @Output() eventContactSelected = new EventEmitter<any>();

  userId: string;

  constructor(public sharedService: SharedService) {
    this.userId = localStorage.getItem('id') || '';
  }

  ngOnInit(): void {
  }

  toggleSidebarContact() {
    if (this.sharedService.openedSidebarContact) {
      this.selectedContact = undefined;
    }
    this.sharedService.toggleSidebarContact();
  }

  selectContact(contact: any) {
    this.selectedContact = contact;
    this.eventContactSelected.emit(contact);
  }
}
