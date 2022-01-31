import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { format, parseISO } from 'date-fns';
import { Base64 } from 'src/app/models/base64';
import { Client } from 'src/app/models/client';
import { Job } from 'src/app/models/job';
import { SummaryFilters } from 'src/app/models/summaryFilter';
import { UtilityService } from 'src/app/utility/utility.service';
import { ClientService } from '../client/client.service';
import { JobService } from '../job/job.service';
import { SummaryService } from './summary.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {
  constructor(
    private summaryService: SummaryService,
    private utilityService: UtilityService,
    private clientService: ClientService,
    private jobService: JobService,
    private fb: FormBuilder
  ) {}
  summaryForm: FormGroup;
  clients: Client[];
  jobs: Job[];
  startDate: any;
  endDate: any;
  base64: any;

  private async getMyJobs() {
    try {
      this.jobs = await this.jobService.getJobs();
    } catch (err) {
      this.utilityService.displayError(err, 'error fetching jobs', '');
    }
  }

  private async getClients() {
    try {
      this.clients = await this.clientService.getClients();
    } catch (err) {
      this.utilityService.displayError(err, 'error fetching client', '');
    }
  }

  formatStartDate(data: string) {
    this.startDate = format(parseISO(data), 'dd-MM-yyy');
  }

  formatEndDate(data: string) {
    this.endDate = format(parseISO(data), 'dd-MM-yyy');
  }

  fillForm() {
    this.summaryForm = this.fb.group({
      client: [''],
      job: [''],
      startDate: [''],
      endDate: [''],
    });
  }

  submit() {
    let summary = new SummaryFilters();
    if (this.summaryForm.value.client) {
      summary.clientId = this.clients.find(
        (client) =>
          client.fullName.trim() == this.summaryForm.get('client').value.trim()
      ).id;
    }
    summary.startDate = this.summaryForm.get('startDate').value;
    summary.endDate = this.summaryForm.get('endDate').value;
    this.getSummary(summary);
  }

  async getSummary(summaryFilters) {
    console.log(summaryFilters);
    try {
      const result = await this.summaryService.getBusinessSummary(
        summaryFilters
      );
      this.base64 = { ...result };
    } catch (err) {
      console.log(err);
      this.utilityService.displayError(err);
    }
  }

  downloadPdf() {
    const linkSource =
      'data:' + this.base64.fileType + ';base64,' + this.base64.fileInBase64;
    const downloadLink = document.createElement('a');
    const fileName = this.base64.fileName + this.base64.fileType;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  ngOnInit() {
    this.fillForm();
    this.getClients();
    this.getMyJobs();
  }
}
