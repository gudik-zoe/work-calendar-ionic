import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Business } from 'src/app/models/business';
import { BusinessList } from 'src/app/models/businessList';
import { environment } from 'src/environments/environment';
import { map, switchMap } from 'rxjs/operators';
import { parseISO } from 'date-fns';
@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  rootUrl: string = environment.rootUrlDev + 'business/';
  constructor(private http: HttpClient) {}
  businessList: Business[];

  public getBusinessInDate(date: string) {
    return this.http
      .get<BusinessList>(this.rootUrl + '?date=' + date)
      .pipe(
        map((data: BusinessList) => {
          for (let business of data.resultList) {
            business.timeInHours = this.getHourFromDate(business.date);
          }
          return data;
        })
      )
      .toPromise();
  }

  private getHourFromDate(date: string) {
    let time = null;
    if (parseISO(date).getHours() - 1 > 12) {
      time = parseISO(date).getHours() - 12 + ' PM';
    } else {
      time = parseISO(date).getHours() - 1 + ' AM';
    }
    return time;
  }

  public createBusiness(business: Business) {
    return this.http.post<Business>(this.rootUrl, business).toPromise();
  }

  getBusinessById(businessId: number) {
    let business = null;
    return new Promise<Business>(async (res, rej) => {
      if (this.businessList && this.businessList.length) {
        business = this.businessList.find(
          (business: Business) => business.businessId === businessId
        );
      }
      if (false) {
        res(business);
      } else {
        business = await this.http.get(this.rootUrl + businessId).subscribe(
          (data: Business) => {
            res(data);
          },
          (err) => rej(err)
        );
      }
    });
  }

  public editBusiness(business: Business) {
    return this.http
      .put<Business>(this.rootUrl + business.businessId, business)
      .toPromise();
  }
}
