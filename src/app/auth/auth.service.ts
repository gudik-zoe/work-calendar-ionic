import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../models/loginResponse';
import { User } from '../models/user';
import { UtilityService } from '../utility/utility.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private utilityService: UtilityService
  ) {}
  userIsLogged = new Subject();
  rootUrl: string = environment.rootUrlDev + 'user/';
  loggedUser: User;
  getUser() {
    return new Promise<User>((res, rej) => {
      if (!!this.loggedUser) {
        res(this.loggedUser);
      }
      console.log('doing the chiamata');
      this.http.get<User>(this.rootUrl + 'userData').subscribe(
        (user) => {
          console.log(user);
          if (user) {
            res(user);
          }
        },
        (error) => {
          rej(error);
        }
      );
    });
  }

  public login(login: any) {
    return this.http
      .post<LoginResponse>(this.rootUrl + 'login', login)
      .toPromise();
  }

  public signUp(user: any) {
    return this.http.post(this.rootUrl, user).toPromise();
  }
}
