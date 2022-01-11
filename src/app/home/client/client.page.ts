import { Component, OnInit } from '@angular/core';
import { ClientService } from './client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {
  clients: any;
  client;
  constructor(private clientService: ClientService) {}
  async getClients() {
    try {
      this.clients = await this.clientService.getClients();
      console.log(this.clients);
    } catch (err) {
      console.log(err);
    }
  }

  async addClient(client) {
    try {
      this.client = await this.clientService.addClient(client);
      if (this.client) {
        this.clients.push(this.client);
      }
    } catch (err) {
      console.log(err);
    }
  }

  ngOnInit() {
    this.getClients();
  }
}
