import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { ClientService } from 'src/app/home/client/client.service';
import { AddBusiness } from 'src/app/models/addBusiness';
import { Business } from 'src/app/models/business';
import { Client } from 'src/app/models/client';
import { Job } from 'src/app/models/job';
import { UtilityService } from 'src/app/utility/utility.service';
import { AddBusinessComponent } from '../../add-business/add-business.component';
import { BusinessService } from '../../business.service';

@Component({
  selector: 'app-business-details',
  templateUrl: './business-details.component.html',
  styleUrls: ['./business-details.component.scss'],
})
export class BusinessDetailsComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private businessService: BusinessService,
    private modalCtrl: ModalController,
    private utilityService: UtilityService,
    private loaderCtrl: LoadingController
  ) {}
  businessId: number;
  business: Business;
  backPath: string = 'home/calendar/';

  private getBusinessId() {
    this.activatedRoute.params.subscribe(async (data) => {
      this.businessId = Number(data.businessId);
      this.backPath += data.date;
      this.business = await this.businessService.getBusinessById(
        this.businessId
      );
      console.log(this.business);
    });
  }

  ngOnInit() {
    this.getBusinessId();
  }
}
