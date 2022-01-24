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
  jobs: Job[];

  addJobFormFields: FormField[] = [
    {
      fieldName: 'description',
      type: 'string',
      initialValue: '',
      placeHolder: 'lavoro 1',
      validators: {
        required: true,
        minLength: 3,
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
            this.addJob(new Job(result.data.formValue.description));
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
    console.log('entering confirm delete');
    this.loaderCtrl.create().then(async (el) => {
      console.log('putting the loader');
      el.present();
      try {
        console.log('entering the try');
        const deletedJob = await this.jobService.deleteJob(id);
        console.log('finishing the chiamata');
        if (deletedJob == null) {
          el.dismiss();
          this.jobs = this.jobs.filter((job) => job.id !== id);
          this.utilityService.openToaster('job cancellato con sucesso');
        }
      } catch (err) {
        console.log(err);
        el.dismiss();
        this.utilityService.displayError(err, 'error deleting job', '');
      }
    });
  }

  editJob(job: Job) {
    let buttonAndHandlers: AlertButton[] = [
      { text: 'ok', handler: async () => console.log('this is edit job ') },
    ];
    this.utilityService.dynamicAlert(
      'alert header in job',
      'alert message in job',
      buttonAndHandlers
    );
  }

  ngOnInit() {
    this.getMyJobs();
  }
}
