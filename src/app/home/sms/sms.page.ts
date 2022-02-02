import { Component, OnInit } from '@angular/core';
import { SMS } from '@awesome-cordova-plugins/sms/ngx';
@Component({
  selector: 'app-sms',
  templateUrl: './sms.page.html',
  styleUrls: ['./sms.page.scss'],
})
export class SmsPage implements OnInit {
  constructor(private sms: SMS) {}

  sendSms() {
    this.sms.send('00393201541231', 'hello world');
  }

  ngOnInit() {}
}
