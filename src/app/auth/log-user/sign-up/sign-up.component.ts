import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { SignUpDto } from 'src/app/models/signUpDtp';
import { UtilityService } from 'src/app/utility/utility.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private utilityServic: UtilityService,
    private fb: FormBuilder,
    private router: Router,
    private loader: LoadingController
  ) {}
  @Output() goToSignIn = new EventEmitter<boolean>();
  signUpForm: FormGroup;
  async signUp() {
    if (!this.signUpForm.valid) {
      return;
    }
    this.loader.create().then(async (element) => {
      element.present();
      const signUpDto: SignUpDto = {
        fullName: this.signUpForm.get('fullName').value,
        email: this.signUpForm.get('email').value,
        password: this.signUpForm.get('password').value,
        confirmPassword: this.signUpForm.get('confirmPassword').value,
      };
      try {
        const signUpRes = await this.authService.signUp(signUpDto);
        if (signUpRes) {
          this.utilityServic.openToaster('utente registrato con sucesso');
          this.goToSignIn.emit(true);
        }
      } catch (err) {
        this.utilityServic.displayError(err, 'error', '/log-user');
      } finally {
        element.dismiss();
      }
    });
  }

  fillSignUpForm() {
    this.signUpForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() {
    this.fillSignUpForm();
  }
}
