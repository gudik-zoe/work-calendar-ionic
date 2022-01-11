import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarPage } from './calendar.page';
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarPageRoutingModule {}
