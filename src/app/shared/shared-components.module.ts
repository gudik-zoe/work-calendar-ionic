import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { AddModalComponent } from './add-modal/add-modal.component';
import { SelectModalComponent } from './select-modal/select-modal.component';
import { BusinessComponent } from './business/business.component';

@NgModule({
  declarations: [
    HeaderComponent,
    DynamicFormComponent,
    AddModalComponent,
    SelectModalComponent,
    BusinessComponent,
  ],
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  exports: [
    HeaderComponent,
    DynamicFormComponent,
    AddModalComponent,
    SelectModalComponent,
    BusinessComponent,
  ],
})
export class SharedComponentsModule {}
