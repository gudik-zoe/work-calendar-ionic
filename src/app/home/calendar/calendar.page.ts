import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { format, parseISO } from 'date-fns';
import { UtilityService } from 'src/app/utility/utility.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  constructor(private router: Router, private utilityService: UtilityService) {}
  dateValue(data: string) {
    this.router.navigate(['/home/calendar/', data]);
  }

  formatDate(value: string) {
    return format(parseISO(value), 'yyyy-MM-dd HH:mm:ss.ssssss');
  }

  ngOnInit() {}
}
