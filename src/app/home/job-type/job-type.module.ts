import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobTypePageRoutingModule } from './job-type-routing.module';

import { JobTypePage } from './job-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobTypePageRoutingModule
  ],
  declarations: [JobTypePage]
})
export class JobTypePageModule {}
