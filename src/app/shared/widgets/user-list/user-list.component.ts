import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { User } from 'src/app/shared/models/user.interface';
import { UserService } from 'src/app/shared/services/user.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @Input() data = new MatTableDataSource();
  @Input() displayedColumns: string[];
  @Input() totalRecords: number = 20;
  @Input() page: number = 1;
  @Input() size: number = 20;
  @Input() form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private sharedService: SharedService,
    private messagesService: MessagesService
  ) {}

  ngOnInit(): void {
    this.displayedColumns = ['name', 'email', 'createdAt', 'updatedAt', 'activeAt', 'loggedAt', 'actions'];
    this.form = this.fb.group({
      createdAtStart: [''],
      createdAtEnd: [''],
      name: ['', [Validators.maxLength(50)]],
      email: ['', [Validators.maxLength(250)]],
    });
    this.read();
  }

  read() {
    let filter = Object.assign({}, { size: this.size, page: this.page }, this.form.value);
    this.userService.readAsync(filter).subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.data.data = resp;
        // this.data.data = resp.data;
        // this.totalRecords = resp.total;
        // this.size = resp.size;
      },
      error: (error: any) => {
        this.messagesService.errorHandler(error);
      }
    })
  }

  readById(id: string) {
    this.sharedService.openSpinner();
    this.userService.readByIdAsync(id).subscribe({
      next: (resp: User) => {
        // this.openDialog(resp);
        this.sharedService.closeSpinner();
      },
      error: (error: any) => {
        this.messagesService.errorHandler(error);
      }
    })
  }

  delete(id: string) {
    this.sharedService.openSpinner();
    this.userService.deleteByIdAsync(id).subscribe({
      next: (resp: any) => {
        this.read();
        this.sharedService.closeSpinner();
      },
      error: (error: any) => {
        this.messagesService.errorHandler(error);
      }
    })
  }

  handlePageEvent(event: PageEvent) {
    this.size = event.pageSize;
    this.page = (event.pageIndex + 1);
    this.read();
  }

  clear() {
    this.form.reset();
  }

  newUser() {

  }
}
