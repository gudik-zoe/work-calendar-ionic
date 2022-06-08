import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogUserPageRoutingModule } from './log-user-routing.module';

import { LogUserPage } from './log-user.page';
import { SharedComponentsModule } from 'src/app/shared/shared-components.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogUserPageRoutingModule,
    SharedComponentsModule,
    ReactiveFormsModule,
  ],
  declarations: [LogUserPage, SignInComponent, SignUpComponent],
})
export class LogUserPageModule {}
