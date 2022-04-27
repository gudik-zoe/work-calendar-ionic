import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarPage } from './calendar.page';
// import { BusinessDetailsComponent } from './day/business-details/business-details.component';
import { DayComponent } from './day/day.component';

const routes: Routes = [
  {
    path: '',
    component: CalendarPage,
  },
  {
    path: ':day',
    component: DayComponent,
  },
  // {
  //   path: ':date/:businessId',
  //   component: BusinessDetailsComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarPageRoutingModule {}
