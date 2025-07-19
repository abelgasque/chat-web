import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tenant-list',
  templateUrl: './tenant-list.component.html',
  styleUrls: ['./tenant-list.component.scss']
})
export class TenantListComponent implements OnInit {

  @Input() set data(value: any[]) {
    this.dataSource.data = value || [];
  }

  @Input() totalRecords: number = 20;
  @Input() page: number = 1;
  @Input() size: number = 20;
  @Input() form: FormGroup;

  @Output() eventRead = new EventEmitter<any>();
  @Output() eventReadById = new EventEmitter<any>();
  @Output() eventDeleteById = new EventEmitter<any>();

  public dataSource = new MatTableDataSource<any>();
  public displayedColumns: string[];

  constructor() { }

  ngOnInit(): void {
    this.displayedColumns = [
      'name', 'database', 'createdAt', 'deletedAt', 'actions'
    ];
  }

  readById(id: string) {
    console.log(id);
    this.eventReadById.emit(id);
  }

  deleteById(id: string) {
    this.eventDeleteById.emit(id);
  }

  handlePageEvent(event: PageEvent) {
    this.size = event.pageSize;
    this.page = (event.pageIndex + 1);
    this.eventRead.emit({ size: this.size, page: this.page });
  }

  clear() {
    this.form.reset();
  }
}
