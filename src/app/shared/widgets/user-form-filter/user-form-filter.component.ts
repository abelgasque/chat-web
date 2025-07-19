import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-form-filter',
  templateUrl: './user-form-filter.component.html',
  styleUrls: ['./user-form-filter.component.scss']
})
export class UserFormFilterComponent implements OnInit {

  @Input() form: FormGroup;

  constructor(private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      createdAtStart: [''],
      createdAtEnd: [''],
      name: ['', [Validators.maxLength(50)]],
      email: ['', [Validators.maxLength(250)]],
    });
  }

}
