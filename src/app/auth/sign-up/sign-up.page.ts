import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/utility/utility.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  constructor(
    private authService: AuthService,
    private utilityServic: UtilityService
  ) {}
  async signUp() {
    const signUpDto = {
      fullName: 'fullUser',
      email: 'user@user.com',
      password: 'Singleguys993--',
    };

    try {
      const signUpRes = await this.authService.signUp(signUpDto);
      console.log(signUpRes);
    } catch (err) {
      this.utilityServic.displayError(err);
    }
  }

  ngOnInit() {}
}
