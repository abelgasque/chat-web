import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './widgets/sidebar/sidebar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MessageComponent } from './components/message/message.component';
import { SupersetDashboardComponent } from './components/superset-dashboard/superset-dashboard.component';
import { UserListComponent } from './widgets/user-list/user-list.component';
import { UserFormComponent } from './widgets/user-form/user-form.component';
import { TenantListComponent } from './widgets/tenant-list/tenant-list.component';

let components = [
  FooterComponent,
  NavbarComponent,
  SidebarComponent,
  SpinnerComponent,
  MessageComponent,
  SupersetDashboardComponent,
  UserListComponent,
  UserFormComponent,
  TenantListComponent,
]

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatTabsModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    // MessageService,
  ]
})
export class SharedModule { }
