import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';

import { PaginationDTO } from 'src/app/shared/models/DTO/pagination.dto';
import { BotService } from 'src/app/shared/services/bot.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { SharedService } from 'src/app/shared/services/shared.service';


@Component({
  selector: 'app-bot',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.scss']
})
export class BotComponent implements OnInit {

  public form!: FormGroup;
  public tabLabel = "Create";
  public isEditing = false;
  public selectedTabIndex = 0;
  public columns: any[];
  public bots: any = [];
  public bot: any;
  public filters: PaginationDTO;

  constructor(
    private fb: FormBuilder,
    private service: BotService,
    private sharedService: SharedService,
    private messagesService: MessagesService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [{ value: '', disabled: true }],
      name: ['', Validators.required],
      createdAt: [{ value: '', disabled: true }],
      updatedAt: [{ value: '', disabled: true }],
      deletedAt: [{ value: '', disabled: true }],
      code: ['', Validators.required]
    });

    this.columns = [
      { name: 'name', label: 'Name' },
      { name: 'createdAt', label: 'Date Create' },
      { name: 'updatedAt', label: 'Date Update' },
      { name: 'deletedAt', label: 'Date Delete' },
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
          this.bots = resp;
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
          this.bot = resp;
          this.form.patchValue(this.bot);
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
          const index = this.bots.findIndex(item => item?.id === id);
          this.bots.splice(index, 1);
        },
        error: (error: any) => { this.messagesService.errorHandler(error); }
      });
  }

}
