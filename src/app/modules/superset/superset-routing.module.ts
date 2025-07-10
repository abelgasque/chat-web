import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SupersetComponent } from './superset.component';

const routes: Routes = [
  {
    path: '',
    component: SupersetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupersetRoutingModule { }
