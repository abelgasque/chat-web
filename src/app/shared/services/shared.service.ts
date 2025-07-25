import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public openedSidebar: boolean = false;
  public openedSidebarContact: boolean = true;
  public openedSidebarChat: boolean = false;
  public openedSpinner: boolean = false;

  constructor() { }

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
}
