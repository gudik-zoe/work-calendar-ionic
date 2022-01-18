import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormField } from 'src/app/models/formField';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
})
export class AddModalComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}
  @Input() header: string;
  @Input() content: FormField[];

  @Output() submitButton = new EventEmitter();
  @Output() cancelButton = new EventEmitter();

  save(data) {
    this.modalCtrl.dismiss(
      {
        client: data,
      },
      'confirm'
    );
  }

  close(data) {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {}
}
