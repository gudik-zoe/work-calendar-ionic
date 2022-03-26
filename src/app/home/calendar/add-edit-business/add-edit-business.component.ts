import {
  Component,
  ErrorHandler,
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
import { BusinessForm } from 'src/app/models/addBusiness';
import { Client } from 'src/app/models/client';
import { Job } from 'src/app/models/job';
import { SelectModalComponent } from 'src/app/shared/select-modal/select-modal.component';
import { UtilityService } from 'src/app/utility/utility.service';
import { ClientService } from '../../client/client.service';
import { JobService } from '../../job/job.service';

@Component({
  selector: 'app-add-edit-business',
  templateUrl: './add-edit-business.component.html',
  styleUrls: ['./add-edit-business.component.scss'],
})
export class AddEditBusinessComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private clientService: ClientService,
    private JobsService: JobService,
    private utilityService: UtilityService
  ) {}
  @Input() addBusinessFields: BusinessForm;
  @Input() header: string;
  clients: Client[];
  jobs: Job[];
  date: string;
  selectedClient: string;
  selectedJob: string;
  createBusinessForm: FormGroup;
  startTime: string;
  endTime: string;
  startTimeParsedForBe: string;
  endTimeParsedForBe: string;
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
          this.addBusinessFields.client = result.data.selectedValue;
          this.createBusinessForm
            .get('client')
            .setValue(result.data.selectedValue);
        } else if (result.role === 'confirm' && data === 'job') {
          this.addBusinessFields.job = result.data.selectedValue;
          this.createBusinessForm
            .get('job')
            .setValue(result.data.selectedValue);
        }
      });
  }

  fillForm() {
    this.createBusinessForm = this.fb.group({
      client: [this.addBusinessFields.client, [Validators.required]],
      job: [this.addBusinessFields.job, [Validators.required]],
      startTime: [this.addBusinessFields.startTime, [Validators.required]],
      endTime: [this.addBusinessFields.endTime, [Validators.required]],
      note: [this.addBusinessFields.note],
      position: [this.addBusinessFields.position],
      businessId: [this.addBusinessFields.businessId],
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
    this.addBusinessFields = null;
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

  formatStartDate(data: string) {
    this.startTime = data;
    return format(parseISO(data), 'HH:mm');
  }

  formatEndDate(data: string) {
    this.endTime = data;
    return format(parseISO(data), 'HH:mm');
  }
  async getClientsAndJobs() {
    try {
      this.clients = await this.clientService.getClients();
      this.jobs = await this.JobsService.getJobs();
    } catch (err) {
      this.utilityService.displayError(err);
    }
  }

  ngOnInit() {
    this.getClientsAndJobs();
    this.fillForm();
    console.log(this.addBusinessFields);
  }
}
