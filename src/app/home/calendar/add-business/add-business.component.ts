import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ModalController,
  PickerController,
  PickerOptions,
} from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { Client } from 'src/app/models/client';
import { Job } from 'src/app/models/job';
import { SelectModalComponent } from 'src/app/shared/select-modal/select-modal.component';

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
  selectedClient: string;
  selectedJob: string;
  createBusinessForm: FormGroup;
  startTime: string;
  endTime: string;
  clientsByFullName: string[];
  clientExists: boolean = false;

  getClientByFullName() {
    this.clientsByFullName = this.clients.map((client) => {
      return client.fullName;
    });
  }

  openSelectModal(data: string) {
    this.modalCtrl
      .create({
        component: SelectModalComponent,
        componentProps: {
          theList: data === 'client' ? this.clients : this.jobs,
          title: data === 'client' ? 'scegli cliente' : 'scegli commessa',
          backPath: 'home/calendar/' + this.date,
          searchPlaceHolder:
            data === 'client' ? 'cerca cliente' : 'cerca commessa',
        },
        cssClass: 'small-modal',
      })
      .then((modalEL) => {
        modalEL.present();
        return modalEL.onDidDismiss();
      })
      .then(async (result: any) => {
        if (result.role === 'confirm' && data === 'client') {
          this.selectedClient = result.data.selectedValue;
          this.createBusinessForm
            .get('client')
            .setValue(result.data.selectedValue);
        } else if (result.role === 'confirm' && data === 'job') {
          this.selectedJob = result.data.selectedValue;
          this.createBusinessForm
            .get('job')
            .setValue(result.data.selectedValue);
        }
      });
  }

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
      console.log(this.createBusinessForm.value);
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

  // async showPicker(client: string) {
  //   let options: PickerOptions = {
  //     keyboardClose: false,
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //       },
  //       {
  //         text: 'Ok',
  //         handler: (value: any) => {
  //           console.log(value);
  //         },
  //       },
  //     ],
  //     columns: [
  //       {
  //         name: 'clients',
  //         options: [
  //           {
  //             text: client,
  //             value: client,
  //           },
  //         ],
  //       },
  //     ],
  //   };
  //   let picker = await this.pickerController.create(options);
  //   picker.present();
  // }

  ngOnInit() {
    this.fillForm();
  }
}
