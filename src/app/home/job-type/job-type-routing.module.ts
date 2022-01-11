import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobTypePage } from './job-type.page';

const routes: Routes = [
  {
    path: '',
    component: JobTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobTypePageRoutingModule {}
