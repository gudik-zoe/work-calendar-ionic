/* eslint-disable object-shorthand */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AlertButton } from '../models/AlertButton';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor(
    private toastCtrl: ToastController,
    private alertController: AlertController,
    private router: Router
  ) {}
  errorMessage: string;

  public monthsArray = [
    'Giennaio',
    'Febbraio',
    'Marzo',
    'Aprile',
    'Maggio',
    'Giugno',
    'Luglio',
    'Agosto',
    'Settembre',
    'Ottobre',
    'Novembre',
    'Dicembre',
  ];

  openToaster(message: string, duration: number = 1000, position: any = 'top') {
    this.toastCtrl.create({ message, duration, position }).then((elem) => {
      elem.present();
    });
  }

  displayError(
    error: HttpErrorResponse,
    header: string = 'errore',
    text: string = 'ok'
  ) {

    if (error.status === 422 && error.error.data) {
      for (let message of error.error.data) {
        this.errorMessage += message + '\n';
      }
    } else {
      this.errorMessage = error.error.message;
    }
    this.alertController
      .create({
        header: header,
        message: this.errorMessage,
        buttons: [
          {
            text,
            handler: () => {
             console.log(error.status)
                     },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }

  displayErrorWithRoute(
    error: HttpErrorResponse,
    header: string = 'error',
    route: string = 'home/calendar',
    text: string = 'ok'
  ) {
    console.log(error);
    if (error.status === 422 && error.error.data) {
      for (let message of error.error.data) {
        this.errorMessage += message + '\n';
      }
    } else {
      this.errorMessage = error.error.message;
    }
    this.alertController
      .create({
        header: header,
        message: this.errorMessage,
        buttons: [
          {
            text,
            handler: () => {
              this.router.navigate([route]);
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }

  dynamicAlert(header: string, message: string, buttons: AlertButton[]) {
    let buttonsArray = [];
    if (buttons == null) {
      buttonsArray.push({ text: 'ok', handler: async () => {} });
    } else {
      buttons.forEach((button) =>
        buttonsArray.push({
          text: button.text,
          handler: () => button.handler(),
        })
      );
    }
    this.alertController
      .create({ header, message, buttons: buttonsArray })
      .then((alertEl) => {
        alertEl.present();
      });
  }
}
