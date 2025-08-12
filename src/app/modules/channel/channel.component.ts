import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';

import { PaginationDTO } from 'src/app/shared/models/DTO/pagination.dto';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { SharedService } from 'src/app/shared/services/shared.service';

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
  public channel: any;
  public filters: PaginationDTO;

  constructor(
    private service: ChannelService,
    private sharedService: SharedService,
    private messagesService: MessagesService
  ) { }

  ngOnInit(): void {
    this.columns =[
      { name: 'name', label: 'Name' },
      { name: 'type', label: 'Type' },
      { name: 'lang', label: 'Lang' },
      { name: 'createdAt', label: 'Date Create' },
      { name: 'isActive', label: 'Active' },
    ];

    this.filters = {
      page: 1,
      pageSize: 25,
    };
    // this.onRead();
  }

  setTab(index, title) {
    this.selectedTabIndex = index;
    this.tabLabel = title;
  }

  handlePage(event: PaginationDTO) {
    this.filters = event;
    this.onRead();
  }

  onRead() {
    this.sharedService.openSpinner();
    this.service.readAsync(this.filters)
      .pipe(
        finalize(() => {
          this.sharedService.closeSpinner();
        })
      )
      .subscribe({
        next: (resp: any) => {
          this.channels = resp;
        },
        error: (error: any) => {
          this.messagesService.errorHandler(error);
        }
      });
  }

  onReadById(id: string) {
    this.sharedService.openSpinner();
    this.service.readByIdAsync(id)
      .pipe(
        finalize(() => {
          this.sharedService.closeSpinner();
        })
      )
      .subscribe({
        next: (resp: any) => {
          this.channel = resp;
          this.setTab(1, "Edit");
        },
        error: (error: any) => {
          this.messagesService.errorHandler(error);
        }
      });
  }

  onDelete(id: string) {
    this.sharedService.openSpinner();

    this.service.deleteByIdAsync(id)
      .pipe(
        finalize(() => {
          const index = this.channels.findIndex(item => item?.id === id);
          this.channels.splice(index, 1);
        })
      )
      .subscribe({
        next: (resp: any) => {
          this.onRead();
        },
        error: (error: any) => {
          this.messagesService.errorHandler(error);
        }
      });
  }
}
