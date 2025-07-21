import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() set data(value: any[]) {
    this.dataSource.data = value || [];
  }

  @Input() totalRecords: number = 0;
  @Input() page: number = 1;
  @Input() size: number = 25;
  @Input() form: FormGroup;
  @Input() columns: any[];

  @Output() eventRead = new EventEmitter<any>();
  @Output() eventReadById = new EventEmitter<any>();
  @Output() eventDeleteById = new EventEmitter<any>();

  public dataSource = new MatTableDataSource<any>();
  public displayedColumns: string[];

  constructor() { }

  ngOnInit(): void {
    this.displayedColumns = this.columns.map(c => c.name);
    this.displayedColumns.push('actions');
  }

  getCellValue(row: any, columnName: string): any {
    const value = row[columnName];
    if (columnName.toLowerCase().includes('date') && value) {
      return new Date(value).toLocaleString();
    }
    return value;
  }
  readById(id: string) {
    this.eventReadById.emit(id);
  }

  deleteById(id: string) {
    this.eventDeleteById.emit(id);
  }

  handlePageEvent(event: PageEvent) {
    this.size = event.pageSize;
    this.page = (event.pageIndex + 1);
    this.eventRead.emit({ pageSize: this.size, page: this.page });
  }

  clear() {
    this.form.reset();
  }
}
