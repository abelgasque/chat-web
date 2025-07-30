import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public openedSidebar: boolean = false;
  public openedSidebarContact: boolean = true;
  public openedSidebarChat: boolean = false;
  public openedSpinner: boolean = false;

  public contacts: any[] = [];
  public selectedContact: any;

  constructor(private router: Router) { }

  toggleSidebar() {
    this.openedSidebar = !this.openedSidebar;
  }

  toggleSidebarChat() {
    this.openedSidebarChat = !this.openedSidebarChat;
  }

  toggleSidebarContact() {
    this.openedSidebarContact = !this.openedSidebarContact;
  }

  openSpinner() {
    this.openedSpinner = true;
  }

  closeSpinner() {
    this.openedSpinner = false;
  }

  selectContact(contact: any) {
    this.selectedContact = contact;
    this.router.navigate([`/chat/user/${contact.id}`]);
  }
}
