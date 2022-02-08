import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { AlertButton } from 'src/app/models/AlertButton';
import { Client } from 'src/app/models/client';
import { FormField } from 'src/app/models/formField';
import { AddModalComponent } from 'src/app/shared/add-modal/add-modal.component';
import { UtilityService } from 'src/app/utility/utility.service';
import { ClientService } from './client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {
  clients: Client[];
  constructor(
    private clientService: ClientService,
    private ModalCtrl: ModalController,
    private utilityService: UtilityService,
    private loaderCtrl: LoadingController
  ) {}
  loading: boolean = false;

  addClientFormFields: FormField[] = [
    {
      fieldName: 'clientName',
      type: 'string',
      initialValue: '',
      placeHolder: 'Mario Rossi',
      validators: {
        required: true,
        minLength: 3,
      },
    },
    {
      fieldName: 'colore',
      type: 'string',
      initialValue: '',
      placeHolder: '',
      validators: {
        required: false,
        minLength: 1,
      },
    },
  ];

  getClients() {
    this.loaderCtrl.create().then(async (el) => {
      el.present();
      try {
        this.clients = await this.clientService.getClients();
      } catch (err) {
        this.utilityService.displayError(err, 'error fetching client', '');
      } finally {
        el.dismiss();
      }
    });
  }

  async openAddClientModal() {
    this.ModalCtrl.create({
      component: AddModalComponent,
      componentProps: {
        header: 'aggiungi cliente',
        content: this.addClientFormFields,
      },
    })
      .then((modalEL) => {
        modalEL.present();
        return modalEL.onDidDismiss();
      })
      .then(async (result: any) => {
        if (result.role === 'confirm') {
          this.loaderCtrl.create().then(async (el) => {
            this.addClient(new Client(result.data.formValue.clientName));
          });
        }
      });
  }

  async addClient(client: Client) {
    try {
      const theNewClient = await this.clientService.addClient(client);
      this.utilityService.openToaster('client aggiunto con sucesso');
      this.clients.push(theNewClient);
    } catch (err) {
      this.utilityService.displayError(err, 'error add client', '');
    }
  }

  deleteClient(client: Client) {
    let buttonAndHandlers: AlertButton[] = [
      { text: 'si', handler: async () => this.confirmDeleteClient(client.id) },
      { text: 'cancella', handler: async () => {} },
    ];
    this.utilityService.dynamicAlert(
      'cancella cliente',
      'sei sicuro di voler cancellare il cliente ' + client.fullName,
      buttonAndHandlers
    );
  }

  confirmDeleteClient(id: number) {
    this.loaderCtrl.create().then(async (el) => {
      el.present();
      try {
        const deletedClient = await this.clientService.deleteClient(id);
        this.clients = this.clients.filter((client) => client.id !== id);
        this.utilityService.openToaster('client cancellato con sucesso');
      } catch (err) {
        console.log('arrived here');
        this.utilityService.displayError(err, 'error deleting client', '');
      } finally {
        el.dismiss();
      }
    });
  }

  editClient(client: Client) {
    let buttonAndHandlers: AlertButton[] = [
      { text: 'ok', handler: async () => console.log('this is edit client ') },
    ];
    this.utilityService.dynamicAlert(
      'alert header',
      'alert message',
      buttonAndHandlers
    );
  }

  ngOnInit() {
    this.getClients();
  }
}
