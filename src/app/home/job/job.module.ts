import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobTypePageRoutingModule } from './job-routing.module';

import { JobPage } from './job.page';
import { SharedComponentsModule } from 'src/app/shared/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobTypePageRoutingModule,
    SharedComponentsModule,
  ],
  declarations: [JobPage],
})
export class JobPageModule {}
