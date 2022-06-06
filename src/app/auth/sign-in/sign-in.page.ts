import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { FormField } from 'src/app/models/formField';
import { LoginResponse } from 'src/app/models/loginResponse';
import { UtilityService } from 'src/app/utility/utility.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  constructor(
    private authService: AuthService,
    private utilityservice: UtilityService,
    private loader: LoadingController,
    private router: Router,
    private fb: FormBuilder
  ) {}

  signInForm: FormGroup;
  content: FormField[] = [
    {
      fieldName: 'email',
      type: 'email',
      initialValue: '',
      placeHolder: 'Mario.Rossi@mail.com',
      items: [],
      validators: {
        required: true,
        minLength: 3,
      },
    },
    {
      fieldName: 'password',
      type: 'password',
      initialValue: '',
      items: [],
      placeHolder: '',
      validators: {
        required: true,
        minLength: 1,
      },
    },
  ];
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
        this.utilityservice.displayError(err);
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
