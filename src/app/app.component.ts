import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private authService: AuthService) {}
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.getUser();
  }
  subscription: Subscription;
  loggedUser: User;

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/sign-in']);
  }

  getUser() {
    this.subscription = this.authService.userIsLogged.subscribe(
      async (userIsLogged: boolean) => {
        if (userIsLogged) {
          this.loggedUser = await this.authService.getUser();
        } else {
          this.loggedUser = null;
        }
        console.log(this.loggedUser);
      }
    );
  }
}
