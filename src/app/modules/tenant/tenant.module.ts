import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

import { TenantRoutingModule } from './tenant-routing.module';
import { TenantComponent } from './tenant.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    TenantComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,

    TenantRoutingModule,
    SharedModule,
  ]
})
export class TenantModule { }
