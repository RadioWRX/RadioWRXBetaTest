import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';
import { ResetPasswordPage } from '../reset-password/reset-password';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  public signupForm: FormGroup;
  public loading: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private authProvider: AuthProvider,
    private loadingCtrl: LoadingController) {
      this.signupForm = this.formBuilder.group({
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required]),
      ],
    });
  }

  async signupUser(signupForm: FormGroup): Promise<void> {
    if (!signupForm.valid) {
      console.log(
        'Need to complete the form, current value: ',
        signupForm.value
      );
    } else {
      const email: string = signupForm.value.email;
      const password: string = signupForm.value.password;

      this.authProvider.signupUser(email, password).then(
        () => {
          this.loading.dismiss().then(() => {
            this.navCtrl.push(TabsPage);
            //this.router.navigateByUrl('home');
          });
        },
        error => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: 'Ok', role: 'cancel' }],
            });
            await alert.present();
          });
        }
      );
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();
    }
  }

  goToLogin() {
    this.navCtrl.setRoot(LoginPage);
  }

  goToResetPassword() {
    this.navCtrl.push(ResetPasswordPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
