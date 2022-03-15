import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { FileDetector } from 'protractor';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
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
  editedClientId: number;

  addClientFormFields: FormField[] = [
    {
      fieldName: 'clientName',
      type: 'string',
      initialValue: '',
      placeHolder: 'Mario Rossi',
      items: [],
      validators: {
        required: true,
        minLength: 3,
      },
    },
    {
      fieldName: 'colore',
      type: 'select',
      initialValue: '',
      items: ['red', 'blue', 'green', 'yellow'],
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

  async openClientModal(header: string, content: FormField[]) {
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
            this.addClient(
              new Client(
                null,
                result.data.formValue.clientName,
                result.data.formValue.colore
              )
            );
          } else if (result.role === 'confirm-edit') {
            this.confirmEditClient(result.data.formValue);
          }
        });
      });
  }

  async confirmEditClient(data) {
    try {
      const updatedClient = await this.clientService.updateClient(
        new Client(this.editedClientId, data.clientName, data.colore)
      );
      let index = this.clients.findIndex(
        (client) => client.id == this.editedClientId
      );
      this.clients[index] = updatedClient;
      this.editedClientId = null;
    } catch (err) {
      this.utilityService.displayError(err, 'error edit client', '');
    }
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
        this.utilityService.displayError(err, 'error deleting client', '');
      } finally {
        el.dismiss();
      }
    });
  }

  editClient(client: Client) {
    let editClientFormFields: FormField[] = [...this.addClientFormFields];
    editClientFormFields[0].initialValue = client.fullName;
    editClientFormFields[1].initialValue = client.color;
    this.editedClientId = client.id;
    this.openClientModal('Modifica Cliente', editClientFormFields);
  }
  prepareAddClient() {
    let addClientFormFields: FormField[] = [...this.addClientFormFields];
    addClientFormFields[0].initialValue = null;
    addClientFormFields[1].initialValue = null;
    this.openClientModal('Aggiungi Cliente', addClientFormFields);
  }

  ngOnInit() {
    this.getClients();
  }
}
