import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/models/job';
import { JobService } from './job.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.page.html',
  styleUrls: ['./job.page.scss'],
})
export class JobPage implements OnInit {
  constructor(private jobService: JobService) {}
  myJobs: Job[];
  addJobType() {}

  async getMyJobs() {
    try {
      this.myJobs = await this.jobService.getJobs();
    } catch (err) {
      console.log(err);
    }
  }

  ngOnInit() {
    this.getMyJobs();
  }
}
