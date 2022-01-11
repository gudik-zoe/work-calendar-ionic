import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DayService } from './day.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss'],
})
export class DayComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private dayService: DayService
  ) {}
  date: Date;
  day: string;
  month: string;
  dayDate: number;
  calendarDate: string;
  hours = [];

  getDateDetails(date: Date) {
    this.day = this.dayService.getDayFromDate(date.getDay());
    this.dayDate = date.getDate();
    this.month = this.dayService.getMonthFromDate(date.getMonth());
    this.calendarDate =
      this.day.slice(0, 3) + ' ' + this.dayDate + ' ' + this.month.slice(0, 3);
  }

  ngOnInit() {
    for (let i = 1; i <= 24; i++) {
      if (i < 12) {
        this.hours.push(i + ' am');
      } else {
        this.hours.push(i - 12 + ' pm');
      }
    }

    this.activatedRoute.params.subscribe((data) => {
      this.getDateDetails(new Date(data.day));
    });
  }
}
