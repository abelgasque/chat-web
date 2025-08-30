import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/shared/models/user.interface';
import { UserService } from 'src/app/shared/services/user.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { finalize } from 'rxjs';
import { PaginationDTO } from 'src/app/shared/models/DTO/pagination.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public form: FormGroup;
  public tabLabel = "Create";
  public selectedTabIndex = 0;
  public columns: any[];
  public users: any = [];
  public user: any;
  public filters: PaginationDTO;

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private sharedService: SharedService,
    private messagesService: MessagesService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [{ value: crypto.randomUUID(), disabled: true }],
      name: ['', Validators.required],
      createdAt: [{ value: new Date(), disabled: true }],
      updatedAt: [{ value: new Date(), disabled: true }],
      deletedAt: [{ value: '', disabled: true }],
      avatarUrl: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      activeAt: [''],
      blockedAt: [''],
      nuLogged: [0],
      loggedAt: [''],
      nuRefreshed: [0],
      refreshedAt: ['']
    });

    this.columns = [
      { name: 'avatarUrl', label: 'Avatar' },
      { name: 'username', label: 'Name' },
      { name: 'email', label: 'Email' },
      { name: 'createdAt', label: 'Date Create' },
      { name: 'isActive', label: 'Active' },
      { name: 'isBlock', label: 'Block' },
    ];

    this.filters = {
      page: 1,
      pageSize: 25,
    };
    this.onRead();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const user = this.form.getRawValue();
      console.log('Usuário enviado:', user);

      this.service.createAsync(user).subscribe({
        next: (resp: any) => {
          this.messagesService.success('Usuário criado com sucesso!', resp);
          this.onRead();
        },
        error: (error: any) => {
          this.messagesService.errorHandler(error);
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
          this.users = resp;
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
        next: (resp: User) => {
          this.user = resp;

          this.form.patchValue(this.user);

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
          const index = this.users.findIndex(item => item?.id === id);
          this.users.splice(index, 1);
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
