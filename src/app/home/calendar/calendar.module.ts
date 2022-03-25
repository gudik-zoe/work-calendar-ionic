import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarPageRoutingModule } from './calendar-routing.module';

import { CalendarPage } from './calendar.page';
import { CalendarModule } from 'ion2-calendar';
import { SharedComponentsModule } from 'src/app/shared/shared-components.module';
import { DayComponent } from './day/day.component';
import { AddBusinessComponent } from './add-business/add-business.component';
import { BusinessDetailsComponent } from './day/business-details/business-details.component';
import { TimeParserPipe } from './time-parser.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarPageRoutingModule,
    CalendarModule,
    SharedComponentsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    TimeParserPipe,
    CalendarPage,
    DayComponent,
    AddBusinessComponent,
    BusinessDetailsComponent,
  ],
})
export class CalendarPageModule {}
