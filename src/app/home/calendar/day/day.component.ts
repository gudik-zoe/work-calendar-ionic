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
import { AddBusiness } from 'src/app/models/addBusiness';

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
  AddBusinessFields: AddBusiness = {
    client: '',
    job: '',
    startTime: null,
    endTime: null,
    note: '',
    position: '',
  };

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

  public openAddEditBusinessModal(addMode: boolean, business: Business) {
    let addEditObject = addMode
      ? this.AddBusinessFields
      : this.createEditBusinessObject(business);
    this.modalCtrl
      .create({
        component: AddBusinessComponent,
        componentProps: {
          header: addMode ? 'Aggiungi business' : 'Modifica business',
          addBusinessFields: addEditObject,
        },
      })
      .then((modalEL) => {
        modalEL.present();
        return modalEL.onDidDismiss();
      })
      .then(async (result: any) => {
        if (result.role === 'confirm' && addMode) {
          result.data.formValue.date = this.fullDate;
          this.loaderCtrl.create().then(async (el) => {
            this.createBusiness(result.data.formValue);
          });
        } else if (result.role === 'confirm' && !addMode) {
          this.loaderCtrl.create().then(async (el) => {
            this.editBusiness(result.data.formValue);
          });
        }
      });
  }

  openBusinessdetails(businessId: number) {
    this.router.navigate(['/home/calendar/' + this.fullDate + '/', businessId]);
  }
  formatStartDate(data: string) {
    return format(parseISO(data), 'HH:mm');
  }

  formatEndDate(data: string) {
    return format(parseISO(data), 'HH:mm');
  }

  createEditBusinessObject(business: Business) {
    let businessToBeUpdated = new AddBusiness();
    businessToBeUpdated.client = this.clients.find(
      (client) => client.fullName === business.clientFullName.trim()
    ).fullName;
    businessToBeUpdated.job = this.jobs.find(
      (job) => job.description === business.jobDescription.trim()
    ).description;
    businessToBeUpdated.startTime = business.startTime;
    businessToBeUpdated.endTime = business.endTime;
    businessToBeUpdated.note = business.note;
    businessToBeUpdated.position = business.position;
    businessToBeUpdated.businessId = business.businessId;
    return businessToBeUpdated;
  }

  async editBusiness(businessToBeUpdated) {
    try {
      let business = new Business();
      business.clientId = this.clients.find(
        (client) => client.fullName.trim() == businessToBeUpdated.client.trim()
      ).id;
      business.jobId = this.jobs.find(
        (job) => job.description == businessToBeUpdated.job
      ).id;
      business.date = this.fullDate;
      business.startTime = businessToBeUpdated.startTime;
      business.endTime = businessToBeUpdated.endTime;
      business.businessId = businessToBeUpdated.businessId;
      business.note = businessToBeUpdated.note;
      business.position = businessToBeUpdated.position;
      const updatedBusiness = await this.businessService.editBusiness(business);
      let businessIndex = this.businessList.resultList.findIndex(
        (business) => business.businessId === businessToBeUpdated.businessId
      );
      this.businessList.resultList[businessIndex] = { ...updatedBusiness };
      this.utilityService.openToaster('business modificato con sucesso');
    } catch (err) {
      this.utilityService.displayError(err);
    }
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
      this.utilityService.openToaster('business aggiunto con sucesso');
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
