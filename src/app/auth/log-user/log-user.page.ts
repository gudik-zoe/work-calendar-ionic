import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-log-user',
  templateUrl: './log-user.page.html',
  styleUrls: ['./log-user.page.scss'],
})
export class LogUserPage implements OnInit {
  constructor() {}
  signIn: boolean = true;

  segmentChanged(data) {
    if (data.detail.value == 'signUp') {
      this.signIn = false;
    } else {
      this.signIn = true;
    }
  }
  goToSignIn(goToSignIn: boolean) {
    if (goToSignIn) {
      this.signIn = true;
    }
  }
  ngOnInit() {}
}
