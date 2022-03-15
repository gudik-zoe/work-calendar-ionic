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
  editedJobIndex: number;

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

  async addJobModal() {
    this.ModalCtrl.create({
      component: AddModalComponent,
      componentProps: {
        header: 'aggiungi Commessa',
        content: this.addJobFormFields,
      },
    })
      .then((modalEL) => {
        modalEL.present();
        return modalEL.onDidDismiss();
      })
      .then(async (result: any) => {
        if (result.role === 'confirm') {
          this.loaderCtrl.create().then(async (el) => {
            this.addJob(new Job(null, result.data.formValue.description));
          });
        }
      });
  }

  async addJob(job: Job) {
    try {
      const theNewJob = await this.jobService.addJob(job);
      this.utilityService.openToaster('commessa aggiunta con sucesso');
      this.jobs.push(theNewJob);
    } catch (err) {
      this.utilityService.displayError(err, 'error add client', '');
    }
  }

  async getMyJobs() {
    try {
      this.jobs = await this.jobService.getJobs();
    } catch (err) {
      this.utilityService.displayError(err, 'error fetching jobs', '');
    }
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
          this.utilityService.openToaster('job cancellato con sucesso');
        }
      } catch (err) {
        el.dismiss();
        this.utilityService.displayError(err, 'error deleting job', '');
      }
    });
  }

  editJob(job: Job) {
    this.editedJobId = job.id;
    this.editedJobDescription = job.description;
    console.log(this.editedJobDescription);
  }
  cancel() {
    this.editedJobId = null;
  }
  async confirmEditJob(job: Job) {
    if (
      this.editedJobDescription.trim() == '' ||
      this.editedJobDescription.trim() == job.description
    ) {
      return;
    }
    const modifiedHob = new Job(job.id, this.editedJobDescription);
    try {
      const newJob = await this.jobService.editJob(modifiedHob);
      job.description = newJob.description;
      this.editedJobId = null;
    } catch (err) {
      this.utilityService.displayError(err, 'error editing job', '');
      this.editedJobId = null;
    }
  }

  ngOnInit() {
    this.getMyJobs();
  }
}
