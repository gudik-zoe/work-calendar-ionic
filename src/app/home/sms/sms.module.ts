import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SMS } from '@awesome-cordova-plugins/sms/ngx';
import { IonicModule } from '@ionic/angular';

import { SmsPageRoutingModule } from './sms-routing.module';

import { SmsPage } from './sms.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SmsPageRoutingModule],
  declarations: [SmsPage],
  providers: [SMS],
})
export class SmsPageModule {}
