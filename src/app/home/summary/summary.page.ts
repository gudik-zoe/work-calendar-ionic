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
import { Plugins } from '@capacitor/core';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { HttpClient } from '@angular/common/http';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { LoadingController } from '@ionic/angular';
import { BusinessSummaryResponse } from 'src/app/models/businessSummaryResponse';
// const { FileSystem } = Plugins;

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
    private fb: FormBuilder,
    private loadingCtrl: LoadingController
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

  // FILES_MIME_TYPES = {
  //   EXCEL_TYPE:
  //     'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
  //   PDF_TYPE: 'application/pdf',
  // };

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
  // for base 64 API
  // getSummary(summaryFilters) {
  //   this.loadingCtrl.create().then(async (el) => {
  //     el.present();
  //     try {
  //       const result = await this.summaryService.getBusinessSummary(
  //         summaryFilters
  //       );
  //       result == null ? this.noDataAlert() : (this.base64 = { ...result });
  //     } catch (err) {
  //       console.log(err);
  //       this.utilityService.displayError(err);
  //     } finally {
  //       el.dismiss();
  //     }
  //   });
  // }

  // for get excel by mail API
  getSummary(summaryFilters) {
    this.loadingCtrl.create().then(async (el) => {
      el.present();
      try {
        let result = await this.summaryService.getBusinessSummary(
          summaryFilters
        );
        // let alertButton: AlertButton[] = [
        //   { text: 'ok', handler: async () => {} },
        // ];
        this.utilityService.dynamicAlert(null, result.message, null);
      } catch (err) {
        console.log(err);
        this.utilityService.displayError(err);
      } finally {
        el.dismiss();
      }
    });
  }

  async readFilePath() {
    try {
      const contents = await Filesystem.readFile({
        path: 'summaryFile.xls',
        directory: Directory.Documents,
      });
      console.log('content:', contents);
    } catch (err) {
      console.log('error ' + err);
    }
  }

  weila(base64: Base64) {
    Filesystem.writeFile({
      path: base64.fileName + base64.fileType,
      data: base64.fileInBase64,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
      recursive: true,
    })
      .then((data) => {
        console.log(data);
        Filesystem.getUri({
          path: base64.fileName + base64.fileType,
          directory: Directory.Documents,
        })
          .then((uri) => {
            const file = uri.uri;
            console.log(uri.uri);
            this.readFilePath();
            this.utilityService.openToaster('file saved successfuly');
          })
          .catch((err) => {
            console.log('uri ' + err);
          });
      })
      .catch((err) => {
        console.log('file write ' + err);
      });
  }

  writeSecretFile(base64: Base64) {
    Filesystem.writeFile({
      path: base64.fileName + base64.fileType,
      data: base64.fileInBase64,
      directory: Directory.Documents,
    }).then((data) => {
      console.log(data);
      Filesystem.getUri({
        path: base64.fileName + base64.fileType,
        directory: Directory.Documents,
      })
        .then((uri) => {
          console.log(uri.uri);
          this.readFilePath();
          this.utilityService.openToaster('file saved successfuly');
        })
        .catch((err) => {
          this.utilityService.displayError(err);
        });
    });
    //   this.readFilePath();
    //   this.utilityService.openToaster('file saved successfuly');
    // });
    // .then((uri) => {
    //   console.log('uri ' + uri);
    //   this.fileOpener
    //     .open(base64.fileName + base64.fileType, 'application/xls')
    //     .then(() => {
    //       console.log('file is open');
    //     })
    //     .catch((err) => {
    //       console.log('errore ' + err);
    //     });
    // })
    // .catch((err) => {
    //   console.log(err);
    //   this.utilityService.displayError(err);
    // });
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

  async downloadPdf() {
    // this.writeSecretFile(this.base64);
    //ORIGINAL
    const linkSource =
      'data:' + this.base64.fileType + ';base64,' + this.base64.fileInBase64;
    const downloadLink = document.createElement('a');
    const fileName = this.base64.fileName + this.base64.fileType;
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType;
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  save(name, data, type, isBinary) {
    if (isBinary) {
      var bytes = new Array(data.length);
      for (var i = 0; i < data.length; i++) {
        bytes[i] = data.charCodeAt(i);
      }
      data = new Uint8Array(bytes);
    }

    var blob = new Blob([data], { type: type });
    return blob;
    //  let objectURL = window.URL.createObjectURL(blob);
    //  let anchor = document.createElement('a');

    //  anchor.href = objectURL;
    //  anchor.download = name;
    //  anchor.click();

    //  URL.revokeObjectURL(objectURL);
  }

  ngOnInit() {
    this.fillForm();
    this.getClients();
    this.getMyJobs();
    this.setMonthsArray();
  }
}
