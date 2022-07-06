import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { LoginResponse } from 'src/app/models/loginResponse';
import { UtilityService } from 'src/app/utility/utility.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private utilityservice: UtilityService,
    private loader: LoadingController,
    private router: Router,
    private fb: FormBuilder
  ) {}

  signInForm: FormGroup;
  loginRes: LoginResponse;
  login() {
    if (!this.signInForm.valid) {
      return;
    }
    this.loader.create().then(async (element) => {
      element.present();
      const loginDto = {
        email: this.signInForm.get('email').value,
        password: this.signInForm.get('password').value,
      };
      try {
        this.loginRes = await this.authService.login(loginDto);
        if (this.loginRes) {
          localStorage.setItem('token', this.loginRes.token);
          this.router.navigate(['home/calendar']);
          this.authService.userIsLogged.next(true);
        }
      } catch (err) {
        this.utilityservice.displayError(err, 'error', '/log-user');
      } finally {
        element.dismiss();
      }
    });
  }

  save(data) {}

  close(data) {}

  toFormGroup() {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.toFormGroup();
  }
}
