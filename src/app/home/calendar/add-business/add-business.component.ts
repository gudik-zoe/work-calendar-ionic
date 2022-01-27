import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { Client } from 'src/app/models/client';
import { Job } from 'src/app/models/job';

@Component({
  selector: 'app-add-business',
  templateUrl: './add-business.component.html',
  styleUrls: ['./add-business.component.scss'],
})
export class AddBusinessComponent implements OnInit {
  constructor(private fb: FormBuilder, private modalCtrl: ModalController) {}
  @Input() clients: Client[];
  @Input() jobs: Job[];
  @Input() date: string;

  createBusinessForm: FormGroup;
  startTime: string;
  endTime: string;

  fillForm() {
    this.createBusinessForm = this.fb.group({
      client: ['', [Validators.required]],
      job: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      note: [''],
      position: [''],
    });
  }
  submit() {
    if (!this.createBusinessForm.valid) {
      return;
    }
    this.modalCtrl.dismiss(
      {
        formValue: this.createBusinessForm.value,
      },
      'confirm'
    );
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

  formatStartDate(data: string) {
    this.startTime = format(parseISO(data), 'HH:mm');
  }

  formatEndDate(data: string) {
    this.endTime = format(parseISO(data), 'HH:mm');
  }

  ngOnInit() {
    this.fillForm();
  }
}
