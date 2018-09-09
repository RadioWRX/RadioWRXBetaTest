import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';


/**
 * Generated class for the ResetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  public resetPasswordForm: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private authProvider: AuthProvider,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder) {
      this.resetPasswordForm = this.formBuilder.group({
        email: ['', Validators.compose([Validators.required, Validators.email])],
      });
  }

  resetPassword(resetPasswordForm: FormGroup): void {
    if (!resetPasswordForm.valid) {
      console.log(
        'Form is not valid yet, current value:',
        resetPasswordForm.value
      );
    } else {
      const email: string = resetPasswordForm.value.email;
      this.authProvider.resetPassword(email).then(
        async () => {
          const alert = await this.alertCtrl.create({
            message: 'Check your email for a password reset link',
            buttons: [
              {
                text: 'Ok',
                role: 'cancel',
                handler: () => {
                  this.navCtrl.setRoot(LoginPage);
                  //this.router.navigateByUrl('login');
                },
              },
            ],
          });
          await alert.present();
        },
        async error => {
          const errorAlert = await this.alertCtrl.create({
            message: error.message,
            buttons: [{ text: 'Ok', role: 'cancel' }],
          });
          await errorAlert.present();
        }
      );
    }
  }

  goToSignUp() {
    this.navCtrl.setRoot(SignupPage);
  }

  goToLogin() {
    this.navCtrl.setRoot(LoginPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

}
