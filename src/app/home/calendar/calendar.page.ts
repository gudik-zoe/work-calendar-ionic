import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { format, parseISO } from 'date-fns';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/user';
import { UtilityService } from 'src/app/utility/utility.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  constructor(
    private router: Router,
    private utilityService: UtilityService,
    private authService: AuthService
  ) {}
  myDate: string;
  dateValue() {
    if (this.myDate != null)
      this.router.navigate(['/home/calendar/', this.myDate]);
  }

  formatDate(value: string) {
    return format(parseISO(value), 'yyyy-MM-dd HH:mm:ss.ssssss');
  }

  ionViewDidEnter() {
    this.myDate = null;
  }

  ngOnInit() {}
}
