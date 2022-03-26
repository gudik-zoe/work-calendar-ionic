import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Business } from 'src/app/models/business';
import { BusinessService } from '../../business.service';

@Component({
  selector: 'app-business-details',
  templateUrl: './business-details.component.html',
  styleUrls: ['./business-details.component.scss'],
})
export class BusinessDetailsComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private businessService: BusinessService
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
