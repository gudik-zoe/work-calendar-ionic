import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private utilityServic: UtilityService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  signUpForm: FormGroup;
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

  fillSignUpForm() {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }
  segmentChanged(data) {
    if (data.detail.value == 'signIn') {
      this.router.navigate(['/sign-in']);
    }
  }

  ngOnInit() {
    this.fillSignUpForm();
  }
}
