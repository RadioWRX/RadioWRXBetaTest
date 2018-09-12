import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileProvider {

  public userProfile: firebase.database.Reference;
  public currentUser: firebase.User;

  constructor(public http: HttpClient) {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.currentUser = user;
        this.userProfile = firebase.datebase().ref(`/userProfile/${user.uid}`);
      }
    });
    console.log('Hello ProfileProvider Provider');
}
    //Get User Profile from Firebase
    getUserProfile(): firebase.database.Reference {
      return this.userProfile;
    }

    //Update name in Firebase
    updateName(firstName: string, lastName: string): Promise<any> {
      return this.userProfile.update({ firstName, lastName });
    }

    //Update Date of Birth in Firebase
    updateDOB(birthDate: Date): Promise<any> {
      return this.userProfile.update({ birthDate });
    }

    //Update email in firebase
    updateEmail(newEmail: string, password: string): Promise<any> {
      const credential: firebase.auth.AuthCredential =
      firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email, password
    );

    return this.currentUser
    .reauthenticatAndRetrieveDataWithCredential(credential)
    .then(() => {
      this.currentUser.updateEmail(newEmail).then(() => {
        this.userProfile.update({ email: newEmail});
      });
    })
    .catch(error => {
      console.error(error);
    });
  }

  updatePassword(newPassword: string, oldPassword: string): Promise<any> {
    const credential: firebase.auth.AuthCredential =
    firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email, oldPassword
    );

    return this.currentUser
    .reauthenticateAndRetrieveDataWithCredential(credential)
    .then(() => {
      this.currentUser.updatePassword(newPassword).then(() => {
        console.log('Password Changed');
      });
    })
  }

}
