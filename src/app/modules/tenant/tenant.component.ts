import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';

import { PaginationDTO } from 'src/app/shared/models/DTO/pagination.dto';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TenantService } from 'src/app/shared/services/tenant.service';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.scss']
})
export class TenantComponent implements OnInit {

  public form: FormGroup;
  public isEditing = false;
  public tabLabel = "Create";
  public selectedTabIndex = 0;
  public tenants: any = [];
  public tenant: any = null;
  public columns: any[];
  public filters: PaginationDTO;

  constructor(
    private fb: FormBuilder,
    private service: TenantService,
    private messagesService: MessagesService,
    private sharedService: SharedService,
  ) {
    this.form = this.fb.group({
      id: [{ value: crypto.randomUUID(), disabled: true }],
      name: ['', Validators.required],
      createdAt: [{ value: new Date(), disabled: true }],
      updatedAt: [{ value: new Date(), disabled: true }],
      deletedAt: [{ value: '', disabled: true }],
      domain: ['', Validators.required],
      database: ['', Validators.required]
    });

    this.columns = [
      { name: 'name', label: 'Name' },
      { name: 'database', label: 'Database' },
      { name: 'createdAt', label: 'Date Create' },
      { name: 'isActive', label: 'Active' },
    ];
  }

  ngOnInit(): void {
    this.filters = {
      page: 1,
      pageSize: 25,
    };
    this.onRead();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.sharedService.openSpinner();
      const entity = this.form.getRawValue();
      if (this.isEditing) {
        this.service.updateAsync(entity)
          .pipe(
            finalize(() => { this.sharedService.closeSpinner(); })
          )
          .subscribe({
            next: (resp: any) => {
              this.messagesService.success('Registro atualizado com sucesso!', resp);
              this.form.reset();
            },
            error: (error: any) => { this.messagesService.errorHandler(error); }
          });
      }
      this.service.createAsync(entity)
        .pipe(
          finalize(() => { this.sharedService.closeSpinner(); })
        )
        .subscribe({
          next: (resp: any) => {
            this.messagesService.success('Registro criado com sucesso:', resp);
            this.form.reset();
          },
          error: (error: any) => { this.messagesService.errorHandler(error); }
        });
    }
  }

  onCancel(): void {
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
        finalize(() => {
          this.sharedService.closeSpinner();
        })
      )
      .subscribe({
        next: (resp: any) => {
          this.tenants = resp;
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
        finalize(() => { this.sharedService.closeSpinner(); })
      )
      .subscribe({
        next: (resp: any) => {
          this.tenant = resp;
          this.form.patchValue(this.tenant);
          this.setTab(1, true, "Edit");
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
          const index = this.tenants.findIndex(item => item?.id === id);
          this.tenants.splice(index, 1);
        },
        error: (error: any) => { this.messagesService.errorHandler(error); }
      });
  }
}