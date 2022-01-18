import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { AddModalComponent } from './add-modal/add-modal.component';

@NgModule({
  declarations: [HeaderComponent, DynamicFormComponent, AddModalComponent],
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  exports: [HeaderComponent, DynamicFormComponent, AddModalComponent],
})
export class SharedComponentsModule {}
