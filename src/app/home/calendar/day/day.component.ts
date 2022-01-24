import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  date: Date;
  day: string;
  month: string;
  dayDate: number;
  calendarDate: string;
  hours = [];
  jobs: Job[];
  clients: Client[];

  getDateDetails(date: Date) {
    this.day = this.dayService.getDayFromDate(date.getDay());
    this.dayDate = date.getDate();
    this.month = this.dayService.getMonthFromDate(date.getMonth());
    this.calendarDate =
      this.day.slice(0, 3) + ' ' + this.dayDate + ' ' + this.month.slice(0, 3);
  }

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
  ngOnInit() {
    for (let i = 1; i <= 24; i++) {
      if (i < 12) {
        this.hours.push(i + ' am');
      } else {
        this.hours.push(i - 12 + ' pm');
      }
    }

    this.activatedRoute.params.subscribe((data) => {
      this.getDateDetails(new Date(data.day));
    });
    this.getClients();
    this.getMyJobs();
  }
}
