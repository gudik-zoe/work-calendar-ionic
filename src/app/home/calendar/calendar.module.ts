import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarPageRoutingModule } from './calendar-routing.module';

import { CalendarPage } from './calendar.page';
import { CalendarModule } from 'ion2-calendar';
import { SharedComponentsModule } from 'src/app/shared/shared-components.module';
import { DayComponent } from './day/day.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarPageRoutingModule,
    CalendarModule,
    SharedComponentsModule,
  ],
  declarations: [CalendarPage, DayComponent],
})
export class CalendarPageModule {}
