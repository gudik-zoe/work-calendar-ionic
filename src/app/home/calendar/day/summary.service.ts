import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SummaryFilters } from 'src/app/models/summaryFilter';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SummaryService {
  rootUrl: string = environment.rootUrl + 'business/';
  constructor(private http: HttpClient) {}

  public getBusinessSummary(filters: SummaryFilters) {
    let queryParams = new HttpParams();
    for (let filter in filters) {
      if (filters[filter]) {
        queryParams = queryParams.append(filter.toString(), filters.clientId);
      }
    }
    return this.http
      .get(this.rootUrl + 'summary', { params: queryParams })
      .toPromise();
  }
}
