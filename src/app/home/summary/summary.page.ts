import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { format, parseISO } from 'date-fns';
import { AlertButton } from 'src/app/models/AlertButton';
import { Base64 } from 'src/app/models/base64';
import { Client } from 'src/app/models/client';
import { Job } from 'src/app/models/job';
import { SummaryFilters } from 'src/app/models/summaryFilter';
import { MonthUtility } from 'src/app/utility/monthUtility';
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
    public utilityService: UtilityService,
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
  months: string[];
  month: string;
  selectedClient;

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
      month: ['', Validators.required],
      // startDate: [''],
      // endDate: [''],
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
    if (this.summaryForm.value.job) {
      summary.jobId = this.jobs.find(
        (job) =>
          job.description.trim() == this.summaryForm.get('job').value.trim()
      ).id;
    }
    summary.startDate = null;
    summary.endDate = null;
    summary.month = this.summaryForm.get('month').value.trim();
    this.getSummary(summary);
  }

  async getSummary(summaryFilters) {
    try {
      const result = await this.summaryService.getBusinessSummary(
        summaryFilters
      );
      result == null ? this.noDataAlert() : (this.base64 = { ...result });
    } catch (err) {
      this.utilityService.displayError(err);
    }
  }
  noDataAlert() {
    let buttonAndHandlers: AlertButton[] = [
      { text: 'ok', handler: async () => {} },
    ];
    this.utilityService.dynamicAlert(
      'No data',
      'non ci sono business per il mese di ' +
        this.summaryForm.get('month').value.trim(),
      buttonAndHandlers
    );
  }

  setMonthsArray() {
    this.months = [...this.utilityService.monthsArray];
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
    this.setMonthsArray();
  }
}
