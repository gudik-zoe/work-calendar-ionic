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
  rootUrl: string = environment.rootUrl + 'business/';
  constructor(private http: HttpClient) {}

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
}
