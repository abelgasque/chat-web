import { Component, OnInit } from '@angular/core';

import { ChannelService } from 'src/app/shared/services/channel.service';
import { MessagesService } from 'src/app/shared/services/messages.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {

  public tabLabel = "Create";
  public selectedTabIndex = 0;
  public columns: any[];
  public channels: any = [];
  public channel: any = null;

  constructor(
    private service: ChannelService,
    private messagesService: MessagesService
  ) { 
    this.columns =[
      { name: 'name', label: 'Name' },
      { name: 'type', label: 'Type' },
      { name: 'lang', label: 'Lang' },
      { name: 'createdAt', label: 'Date Create' },
      { name: 'deleteAt', label: 'Date Delete' },
    ];
  }

  ngOnInit(): void {
    this.onRead(null);
  }

  setTab(index, title) {
    this.selectedTabIndex = index;
    this.tabLabel = title;
  }

  onRead(filter: any) {
    this.service.readAsync().subscribe({
      next: (resp: any) => {
        this.channels = resp;
      },
      error: (error: any) => {
        this.messagesService.errorHandler(error);
      }
    })
  }

  onReadById(id: string) {
    this.service.readByIdAsync(id).subscribe({
      next: (resp: any) => {
        this.channel = resp;
        this.setTab(1, "Edit");
      },
      error: (error: any) => {
        this.messagesService.errorHandler(error);
      }
    })
  }

  onDelete(id: string) {
    this.service.deleteByIdAsync(id).subscribe({
      next: (resp: any) => {
        this.onRead(null);
      },
      error: (error: any) => {
        this.messagesService.errorHandler(error);
      }
    })
  }

}
