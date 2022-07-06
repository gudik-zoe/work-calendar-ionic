import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { AlertButton } from 'src/app/models/AlertButton';
import { FormField } from 'src/app/models/formField';
import { Job } from 'src/app/models/job';
import { AddModalComponent } from 'src/app/shared/add-modal/add-modal.component';
import { UtilityService } from 'src/app/utility/utility.service';
import { JobService } from './job.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.page.html',
  styleUrls: ['./job.page.scss'],
})
export class JobPage implements OnInit {
  constructor(
    private jobService: JobService,
    private ModalCtrl: ModalController,
    private loaderCtrl: LoadingController,
    private utilityService: UtilityService
  ) {}
  public jobs: Job[];
  editedJobId: number;
  editedJobDescription: string;

  addJobFormFields: FormField[] = [
    {
      fieldName: 'description',
      type: 'string',
      initialValue: '',
      placeHolder: 'lavoro 1',
      items: [],
      validators: {
        required: true,
        minLength: 5,
      },
    },
  ];

  async openJobModal(header: string, content: FormField[]) {
    this.ModalCtrl.create({
      component: AddModalComponent,
      componentProps: {
        header: header,
        content: content,
      },
    })
      .then((modalEL) => {
        modalEL.present();
        return modalEL.onDidDismiss();
      })
      .then(async (result: any) => {
        this.loaderCtrl.create().then(async (el) => {
          if (result.role === 'confirm-add') {
            this.addJob(new Job(null, result.data.formValue.description));
          } else if (result.role === 'confirm-edit') {
            this.editJob(result.data.formValue);
          }
        });
      });
  }

  async addJob(job: Job) {
    this.loaderCtrl.create().then(async (el) => {
      el.present();
      try {
        const theNewJob = await this.jobService.addJob(job);
        console.log(theNewJob);
        this.utilityService.openToaster('commessa aggiunta con sucesso');
        this.jobs.push(theNewJob);
        el.dismiss();
      } catch (err) {
        el.dismiss();
        this.utilityService.displayError(err, 'error add job', '');
      }
    });
  }

  async editJob(data) {
    this.loaderCtrl.create().then(async (el) => {
      el.present();
      try {
        const theUpdatedJob = await this.jobService.editJob(
          new Job(this.editedJobId, data.description)
        );
        let index = this.jobs.findIndex((job) => job.id == this.editedJobId);
        this.jobs[index] = theUpdatedJob;
        this.editedJobId = null;
        el.dismiss();
        this.utilityService.openToaster('commessa modificata con sucesso');
      } catch (err) {
        el.dismiss();
        this.utilityService.displayError(err, 'error editing job', '');
      }
    });
  }

  prepareEditJob(job: Job) {
    let editJobFormFields: FormField[] = [...this.addJobFormFields];
    editJobFormFields[0].initialValue = job.description;
    this.editedJobId = job.id;
    this.openJobModal('Modifica Commessa', editJobFormFields);
  }

  prepareAddJob() {
    let addJobFormFields: FormField[] = [...this.addJobFormFields];
    addJobFormFields[0].initialValue = null;
    this.openJobModal('Aggiungi Commessa', addJobFormFields);
  }

  async getMyJobs() {
    this.loaderCtrl.create().then(async (el) => {
      el.present();
      try {
        this.jobs = await this.jobService.getJobs();
        console.log(this.jobs);
      } catch (err) {
        this.utilityService.displayError(err, 'error fetching jobs', '');
      } finally {
        el.dismiss();
      }
    });
  }
  deleteJob(job: Job) {
    let buttonAndHandlers: AlertButton[] = [
      { text: 'si', handler: async () => this.confirmDeleteJob(job.id) },
      { text: 'cancella', handler: async () => {} },
    ];
    this.utilityService.dynamicAlert(
      'cancella commessa',
      'sei sicuro di voler cancellare la commessa ' + job.description,
      buttonAndHandlers
    );
  }

  confirmDeleteJob(id: number) {
    this.loaderCtrl.create().then(async (el) => {
      el.present();
      try {
        const deletedJob = await this.jobService.deleteJob(id);
        if (deletedJob == null) {
          el.dismiss();
          this.jobs = this.jobs.filter((job) => job.id !== id);
          this.utilityService.openToaster('commessa cancellata con sucesso');
        }
      } catch (err) {
        el.dismiss();
        this.utilityService.displayError(err, 'error deleting job');
      }
    });
  }

  ngOnInit() {
    this.getMyJobs();
  }
}
