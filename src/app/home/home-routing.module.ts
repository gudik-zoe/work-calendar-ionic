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
        path: 'job',
        loadChildren: () =>
          import('./job/job.module').then((m) => m.JobPageModule),
      },
      {
        path: 'client',
        loadChildren: () =>
          import('./client/client.module').then((m) => m.ClientPageModule),
      },
      {
        path: 'summary',
        loadChildren: () =>
          import('./summary/summary.module').then((m) => m.SummaryPageModule),
      },
      {
        path: 'sms',
        loadChildren: () =>
          import('./sms/sms.module').then((m) => m.SmsPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
