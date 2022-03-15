import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Job } from 'src/app/models/job';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private http: HttpClient) {}
  rootUrl: string = environment.rootUrl + 'job/';
  jobs: Job[];
  public getJobs() {
    return this.http.get<Job[]>(this.rootUrl).toPromise();
  }
  public addJob(job: Job) {
    return this.http.post<Job>(this.rootUrl, job).toPromise();
  }
  public deleteJob(id: number) {
    return this.http.delete(this.rootUrl + id).toPromise();
  }
  public editJob(newJob: Job) {
    return this.http.put<Job>(this.rootUrl, newJob).toPromise();
  }
}
