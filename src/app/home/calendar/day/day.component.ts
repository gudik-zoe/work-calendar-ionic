import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonItem, LoadingController, ModalController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { Business } from 'src/app/models/business';
import { Client } from 'src/app/models/client';
import { Job } from 'src/app/models/job';
import { SummaryFilters } from 'src/app/models/summaryFilter';
import { AddModalComponent } from 'src/app/shared/add-modal/add-modal.component';
import { UtilityService } from 'src/app/utility/utility.service';
import { ClientService } from '../../client/client.service';
import { JobService } from '../../job/job.service';
import { AddBusinessComponent } from '../add-business/add-business.component';
import { SummaryService } from '../../summary/summary.service';
import { BusinessService } from '../business.service';
import { BusinessList } from 'src/app/models/businessList';

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
    private modalCtrl: ModalController,
    private businessService: BusinessService,
    private loaderCtrl: LoadingController
  ) {}
  jobs: Job[];
  clients: Client[];
  startTime: string;
  endTime: string;
  clickedDate: string;
  fullDate: string;
  businessList: BusinessList;

  private async getMyJobs() {
    try {
      this.jobs = await this.jobService.getJobs();
    } catch (err) {
      this.utilityService.displayError(err, 'error fetching jobs', '');
    }
  }

  private async getClients() {
    try {
      this.clients = await this.clientService.getClients();
    } catch (err) {
      this.utilityService.displayError(err, 'error fetching client', '');
    }
  }

  private async getBusinessOnDate() {
    try {
      this.businessList = await this.businessService.getBusinessInDate(
        this.fullDate
      );
      console.log(this.businessList);
    } catch (err) {
      this.utilityService.displayError(err);
    }
  }

  private openAddBusinessModal() {
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
          result.data.formValue.date = this.fullDate;
          this.loaderCtrl.create().then(async (el) => {
            this.createBusiness(result.data.formValue);
          });
        }
      });
  }
  private async createBusiness(businessForm) {
    let business = new Business();
    business.clientId = this.clients.find(
      (client) => client.fullName == businessForm.client
    ).id;
    business.jobId = this.jobs.find(
      (job) => job.description == businessForm.job
    ).id;
    business.date = this.fullDate;
    business.startDate = businessForm.startTime;
    business.endDate = businessForm.endTime;
    business.note = businessForm.note;
    business.position = businessForm.position;
    try {
      const newBusiness = await this.businessService.createBusiness(business);
    } catch (err) {
      this.utilityService.displayError(err);
    }
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((data) => {
      this.fullDate = data.day;
      this.clickedDate = format(parseISO(data.day), 'MMM dd yyyy');
    });
    this.getClients();
    this.getMyJobs();
    this.getBusinessOnDate();
  }
}
