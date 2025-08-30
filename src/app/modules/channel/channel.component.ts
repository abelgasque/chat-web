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
  public isEditing = false;
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
      this.sharedService.openSpinner();
      if (this.isEditing) {
        this.service.updateAsync(entity)
          .pipe(
            finalize(() => { this.sharedService.closeSpinner(); })
          )
          .subscribe({
            next: (res) => {
              this.messagesService.success('Registro atualizado com sucesso:', res);
              this.form.reset();
            },
            error: (err) => { this.messagesService.errorHandler(err); }
          });
      } else {
        this.service.createAsync(entity)
          .pipe(
            finalize(() => { this.sharedService.closeSpinner(); })
          )
          .subscribe({
            next: (res) => {
              this.messagesService.success('Registro criado com sucesso:', res);
              this.form.reset();
            },
            error: (err) => { this.messagesService.errorHandler(err); }
          });
      }
    }
  }

  onCancel() {
    this.form.reset();
    this.setTab();
  }

  setTab(index = 0, isEditing = false, title = "Create") {
    this.selectedTabIndex = index;
    this.tabLabel = title;
    this.isEditing = isEditing;
  }

  handlePage(event: PaginationDTO) {
    this.filters = event;
    this.onRead();
  }

  onRead() {
    this.sharedService.openSpinner();
    this.service.readAsync(this.filters)
      .pipe(
        finalize(() => { this.sharedService.closeSpinner(); })
      )
      .subscribe({
        next: (resp: any) => {
          this.channels = resp;
        },
        error: (error: any) => { this.messagesService.errorHandler(error); }
      });
  }

  onReadById(id: string) {
    this.sharedService.openSpinner();
    this.service.readByIdAsync(id)
      .pipe(
        finalize(() => { this.sharedService.closeSpinner(); })
      )
      .subscribe({
        next: (resp: any) => {
          this.channel = resp;
          this.form.patchValue(this.channel);
          this.setTab(1, true, 'Edit');
        },
        error: (error: any) => { this.messagesService.errorHandler(error); }
      });
  }

  onDelete(id: string) {
    this.sharedService.openSpinner();
    this.service.deleteByIdAsync(id)
      .pipe(
        finalize(() => { this.sharedService.closeSpinner(); })
      )
      .subscribe({
        next: (resp: any) => {
          const index = this.channels.findIndex(item => item?.id === id);
          this.channels.splice(index, 1);
        },
        error: (error: any) => { this.messagesService.errorHandler(error); }
      });
  }
}
