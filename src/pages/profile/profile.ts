import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { LoginPage } from '../login/login';

import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AuthProvider) {
  }

  goToEditProfile() {
    this.navCtrl.push(EditProfilePage);
  }

  logOut() : void {
    this.afAuth.logOut()
    .then((data: any) =>{
      this.navCtrl.parent.parent.setRoot(LoginPage);
    })
    .catch((error: any) =>{
      console.dir(error)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
