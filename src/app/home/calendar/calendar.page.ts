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

  dateValue(data: string) {
    const date = this.formatDate(data);
    this.router.navigate(['/home/calendar/', date]);
  }

  formatDate(value: string) {
    return format(parseISO(value), 'MMM dd yyyy');
  }
  ngOnInit() {}
}
