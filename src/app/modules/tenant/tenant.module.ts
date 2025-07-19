import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    MatTabsModule,
    TenantRoutingModule,
    SharedModule,
  ]
})
export class TenantModule { }
