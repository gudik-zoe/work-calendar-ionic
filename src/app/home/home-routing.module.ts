import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarPage } from './calendar/calendar.page';
import { DayComponent } from './calendar/day/day.component';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'calendar',
        loadChildren: () =>
          import('./calendar/calendar.module').then(
            (m) => m.CalendarPageModule
          ),
      },
      {
        path: 'job-type',
        loadChildren: () =>
          import('./job-type/job-type.module').then((m) => m.JobTypePageModule),
      },
      {
        path: 'client',
        loadChildren: () =>
          import('./client/client.module').then((m) => m.ClientPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
