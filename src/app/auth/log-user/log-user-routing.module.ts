import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogUserPage } from './log-user.page';

const routes: Routes = [
  {
    path: '',
    component: LogUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogUserPageRoutingModule {}
