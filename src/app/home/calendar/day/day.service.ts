import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DayService {
  months = [
    'Gennaio',
    'Febbraio',
    'Marzo',
    'Aprile',
    'Maggio',
    'Giugno',
    'Luglio',
    'Agosto',
    'Settembre',
    'Ottobre',
    'Novemvre',
    'Dicembre',
  ];
  days = [
    'Domenica',
    'Lunedi',
    'Martedi',
    'Mercoledi',
    'Giovedi',
    'Venerdi',
    'Sabato',
  ];
  getMonthFromDate(monthNumber: number) {
    return this.months[monthNumber];
  }
  constructor() {}

  public getDayFromDate(dateNumber: number) {
    return this.days[dateNumber];
  }
}
