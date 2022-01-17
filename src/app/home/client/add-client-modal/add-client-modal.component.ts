import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-client-modal',
  templateUrl: './add-client-modal.component.html',
  styleUrls: ['./add-client-modal.component.scss'],
})
export class AddClientModalComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  close() {
    this.modalCtrl.dismiss();
  }

  saveClient(data: any) {
    this.modalCtrl.dismiss(
      {
        clientName: data.clientName,
      },
      'confirm'
    );
  }

  ngOnInit() {}
}
