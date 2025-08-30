import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  public form!: FormGroup;
  public tabLabel = "Create";
  public selectedTabIndex = 0;
  public columns: any[];
  public channels: any = [];
  public channel: any;
  public filters: PaginationDTO;

  constructor(
    private fb: FormBuilder,
    private service: ChannelService,
    private sharedService: SharedService,
    private messagesService: MessagesService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [{ value: crypto.randomUUID(), disabled: true }],
      name: ['', Validators.required],
      createdAt: [{ value: new Date(), disabled: true }],
      updatedAt: [{ value: new Date(), disabled: true }],
      deletedAt: [{ value: '', disabled: true }],
      type: [0, Validators.required],
      lang: [''],
      url: ['', Validators.pattern('https?://.+')]
    });

    this.columns = [
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

    this.onRead();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const entity = this.form.value;

      this.service.createAsync(entity).subscribe({
        next: (res) => {
          this.messagesService.success('Registro criado com sucesso:', res);
          this.form.reset();
        },
        error: (err) => {
          this.messagesService.errorHandler(err);
        }
      });
    }
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
          this.form.patchValue({
            id: resp.id,
            name: resp.name,
            createdAt: resp.createdAt ? new Date(resp.createdAt) : null,
            updatedAt: resp.updatedAt ? new Date(resp.updatedAt) : null,
            deletedAt: resp.deletedAt ? new Date(resp.deletedAt) : null,
            type: resp.type,
            lang: resp.lang,
            url: resp.url
          });

          this.setTab(1, 'Edit');
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
