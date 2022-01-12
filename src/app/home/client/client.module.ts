import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientPageRoutingModule } from './client-routing.module';

import { ClientPage } from './client.page';
import { SharedComponentsModule } from 'src/app/shared/shared-components.module';
import { AddClientModalComponent } from './add-client-modal/add-client-modal.component';
import { AddClientFormComponent } from './add-client-form/add-client-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedComponentsModule,
    ReactiveFormsModule,
    ClientPageRoutingModule,
  ],
  declarations: [ClientPage, AddClientModalComponent, AddClientFormComponent],
})
export class ClientPageModule {}
