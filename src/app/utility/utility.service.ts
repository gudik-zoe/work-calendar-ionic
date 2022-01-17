import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor(private toastCtrl: ToastController) {}

  openToaster(message: string, duration: number = 2000, position: any = 'top') {
    this.toastCtrl.create({ message, duration, position }).then((elem) => {
      elem.present();
    });
  }
}
