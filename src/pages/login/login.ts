import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from'@angular/forms';

import { AuthProvider } from '../../providers/auth/auth';

import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';
import { ResetPasswordPage } from '../reset-password/reset-password';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public form: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private fBuilder: FormBuilder,
    private afAuth: AuthProvider) {
      this.form = this.fBuilder.group({
        'email': ['', Validators.required],
        'password': ['', Validators.required]
      });
  }

  login(): void {
    let email: any = this.form.controls['email'].value,
        password: any = this.form.controls['password'].value;

        this.afAuth.loginWithEmailAndPassword(email, password)
        .then((auth: any) => {
          this.navCtrl.setRoot(TabsPage);
        })
        .catch((error: any) => {
          console.log(error.message);
        });
  }

  goToSignUp() {
    this.navCtrl.setRoot(SignupPage);
  }

  goToResetPassword() {
    this.navCtrl.setRoot(ResetPasswordPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
