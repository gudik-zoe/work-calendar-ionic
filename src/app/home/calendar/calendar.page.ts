import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  constructor(private router: Router) {}
  onChange(date) {
    this.router.navigate(['/home/calendar/', date]);
  }
  theDay = 'monday';
  dateValue(data) {
    console.log(data);
  }

  formatDate(value: string) {
    return format(parseISO(value), 'MMM dd yyyy');
  }
  ngOnInit() {}
}
