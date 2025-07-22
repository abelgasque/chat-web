import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SupersetRoutingModule } from './superset-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SupersetComponent } from './superset.component';
import { SupersetService } from 'src/app/shared/services/superset.service';
import { SupersetDashboardComponent } from './superset-dashboard/superset-dashboard.component';

@NgModule({
  declarations: [
    SupersetComponent,
    SupersetDashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,

    SupersetRoutingModule,
    SharedModule
  ],
  providers: [
    SupersetService
  ]
})
export class SupersetModule { }
