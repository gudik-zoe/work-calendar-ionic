import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
import { formatDate } from '@angular/common';

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
    private loaderCtrl: LoadingController,
    private router: Router
  ) {}
  jobs: Job[];
  clients: Client[];
  startTime: string;
  endTime: string;
  clickedDate: string;
  fullDate: string;
  businessList: BusinessList;
  hours: String[] = [
    '8 AM',
    '9 AM',
    '10 AM',
    '11 AM',
    '12 PM',
    '1 PM',
    '2 PM',
    '3 PM',
    '4 PM',
    '5 PM',
    '6 PM',
    '7 PM',
    '8 PM',
    '9 PM',
    '10 PM',
    '11 PM',
    '12 AM',
    '1 AM',
    '2 AM',
    '3 AM',
    '4 AM',
    '5 AM',
    '6 AM',
    '7 AM',
  ];

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
      this.businessService.businessList = [...this.businessList.resultList];
    } catch (err) {
      this.utilityService.displayError(err);
    }
  }

  // getHourFromDate(array) {
  //   for (let business of array) {
  //     console.log(business.date);

  //     console.log(
  //       parseISO(business.date).getHours() - 1 > 12
  //         ? parseISO(business.date).getHours() - 12 + ' pm'
  //         : parseISO(business.date).getHours() - 1 + ' am'
  //     );
  //   }
  // }

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

  openBusinessdetails(businessId: number) {
    console.log(businessId);
    this.router.navigate(['/home/calendar/' + this.fullDate + '/', businessId]);
  }

  private async createBusiness(businessForm) {
    let business = new Business();
    business.clientId = this.clients.find(
      (client) => client.fullName.trim() == businessForm.client.trim()
    ).id;
    business.jobId = this.jobs.find(
      (job) => job.description == businessForm.job
    ).id;
    business.date = this.fullDate;
    business.startTime = businessForm.startTime;
    business.endTime = businessForm.endTime;
    business.note = businessForm.note;
    business.position = businessForm.position;
    try {
      const newBusiness = await this.businessService.createBusiness(business);
      this.businessList.resultList.push(newBusiness);
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
