import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { format, parseISO } from 'date-fns';
import { Client } from 'src/app/models/client';
import { Job } from 'src/app/models/job';
import { UtilityService } from 'src/app/utility/utility.service';
import { ClientService } from '../../client/client.service';
import { JobService } from '../../job/job.service';
import { DayService } from './day.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss'],
})
export class DayComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private dayService: DayService,
    private utilityService: UtilityService,
    private jobService: JobService,
    private clientService: ClientService
  ) {}

  jobs: Job[];
  clients: Client[];
  startTime: string;
  endTime: string;
  clickedDate: string;

  async getMyJobs() {
    try {
      this.jobs = await this.jobService.getJobs();
    } catch (err) {
      this.utilityService.displayError(err, 'error fetching jobs', '');
    }
  }

  async getClients() {
    try {
      this.clients = await this.clientService.getClients();
    } catch (err) {
      this.utilityService.displayError(err, 'error fetching client', '');
    }
  }

  formatStartDate(data: string) {
    this.startTime = format(parseISO(data), 'HH:mm');
  }

  formatEndDate(data: string) {
    this.endTime = format(parseISO(data), 'HH:mm');
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((data) => {
      this.clickedDate = data.day;
    });
    this.getClients();
    this.getMyJobs();
  }
}
