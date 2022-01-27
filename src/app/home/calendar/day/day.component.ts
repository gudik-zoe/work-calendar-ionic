import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { Client } from 'src/app/models/client';
import { Job } from 'src/app/models/job';
import { AddModalComponent } from 'src/app/shared/add-modal/add-modal.component';
import { UtilityService } from 'src/app/utility/utility.service';
import { ClientService } from '../../client/client.service';
import { JobService } from '../../job/job.service';
import { AddBusinessComponent } from '../add-business/add-business.component';
import { DayService } from './day.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss'],
})
export class DayComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private utilityService: UtilityService,
    private jobService: JobService,
    private clientService: ClientService,
    private fb: FormBuilder,
    private modalCtrl: ModalController
  ) {}
  jobs: Job[];
  clients: Client[];
  startTime: string;
  endTime: string;
  clickedDate: string;
  fullDate: Date;

  async getMyJobs() {
    try {
      this.jobs = await this.jobService.getJobs();
    } catch (err) {
      this.utilityService.displayError(err, 'error fetching jobs', '');
    }
  }

  async getClients() {
    try {
      this.clients = await this.clientService.getClients();
    } catch (err) {
      this.utilityService.displayError(err, 'error fetching client', '');
    }
  }

  openAddBusinessModal() {
    this.modalCtrl
      .create({
        component: AddBusinessComponent,
        componentProps: {
          header: 'aggiungi business',
          date: this.clickedDate,
          clients: this.clients,
          jobs: this.jobs,
        },
      })
      .then((modalEL) => {
        modalEL.present();
        return modalEL.onDidDismiss();
      })
      .then(async (result: any) => {
        if (result.role === 'confirm') {
          console.log('confirm');
          // this.loaderCtrl.create().then(async (el) => {
          //   this.addClient(new Client(result.data.formValue.clientName));
          // });
        }
      });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((data) => {
      this.fullDate = data.day;
      this.clickedDate = format(parseISO(data.day), 'MMM dd yyyy');
    });
    this.getClients();
    this.getMyJobs();
  }
}
