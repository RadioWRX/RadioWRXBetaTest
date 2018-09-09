import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

import { AuthProvider } from '../../providers/auth/auth';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(private navCtrl: NavController, private afAuth: AuthProvider) {

  }

  logOut() : void {
    this.afAuth.logOut()
    .then((data: any) =>{
      this.navCtrl.setRoot(LoginPage);
    })
    .catch((error: any) =>{
      console.dir(error)
    })
  }
}
