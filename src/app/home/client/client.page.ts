import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddClientModalComponent } from './add-client-modal/add-client-modal.component';
import { ClientService } from './client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {
  clients: any;
  client;
  constructor(
    private clientService: ClientService,
    private ModalCtrl: ModalController
  ) {}
  async getClients() {
    try {
      this.clients = await this.clientService.getClients();
      console.log(this.clients);
    } catch (err) {
      console.log(err);
    }
  }

  async addClient() {
    try {
      this.ModalCtrl.create({ component: AddClientModalComponent })
        .then((modalEL) => {
          modalEL.present();
          return modalEL.onDidDismiss();
        })
        .then(async (result: any) => {
          if (result.role === 'confirm') {
            try {
              const theNewClient = await this.clientService.addClient({
                fullName: result.data.clientName,
              });
              this.clients.push(theNewClient);
            } catch (err) {
              console.log(err);
            }
          } else {
            console.log('other thing');
          }
        });
      // let client;
      // this.client = await this.clientService.addClient(client);
      // if (this.client) {
      //   this.clients.push(this.client);
      // }
    } catch (err) {
      console.log(err);
    }
  }

  ngOnInit() {
    this.getClients();
  }
}
