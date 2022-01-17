import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { UtilityService } from 'src/app/utility/utility.service';
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
    private ModalCtrl: ModalController,
    private utilityService: UtilityService,
    private loaderCtrl: LoadingController
  ) {}
  loading: boolean = false;

  getClients() {
    this.loaderCtrl.create().then(async (el) => {
      el.present();
      try {
        this.clients = await this.clientService.getClients();
        if (this.clients) {
          el.dismiss();
        }
      } catch (err) {
        el.dismiss();
        console.log(err);
      }
    });
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
            this.loaderCtrl.create().then(async (el) => {
              try {
                const theNewClient = await this.clientService.addClient({
                  fullName: result.data.clientName,
                });
                if (theNewClient) {
                  this.utilityService.openToaster(
                    'client aggiunto con sucesso'
                  );
                  this.clients.push(theNewClient);
                }
              } catch (err) {
                console.log(err);
              }
            });
          } else {
            console.log('other thing');
          }
        });
    } catch (err) {
      console.log(err);
    }
  }

  ngOnInit() {
    this.getClients();
  }
}
