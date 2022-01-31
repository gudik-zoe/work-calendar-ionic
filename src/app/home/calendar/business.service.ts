import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Business } from 'src/app/models/business';
import { BusinessList } from 'src/app/models/businessList';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  rootUrl: string = environment.rootUrl + 'business/';
  constructor(private http: HttpClient) {}

  public getBusinessInDate(date: string) {
    return this.http
      .get<BusinessList>(this.rootUrl + '?date=' + date)
      .toPromise();
  }

  public createBusiness(business: Business) {
    return this.http.post(this.rootUrl, business).toPromise();
  }
}
