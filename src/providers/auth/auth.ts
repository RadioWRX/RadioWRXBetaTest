import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import * as firebase from 'firebase';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  public user: Observable<any>;

  constructor(public http: Http) {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        //User is signed in.
        console.log('User is signed in');
      } else {
        //No user signed in.
        console.log('User is NOT signed in');
      }
    });
    console.log('Hello AuthProvider Provider');
  }

  //Login existing user
  loginWithEmailAndPassword(
    email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((val: any) => {
        resolve(val);
      })
      .catch((error: any) => {
        reject(error);
      })
    })
  }

  //Sing up new user
  signupUser(email: string, password: string): Promise<void> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(newUserCredential => {
        firebase
          .database()
          .ref(`/userProfile/${newUserCredential.user.uid}/email`)
          .set(email);
      })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }

  //Logout existing user
  logOut(): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase
      .auth()
      .signOut()
      .then(() => {
        resolve(true);
      })
      .catch((error: any) => {
        reject(error);
      })
    })
  }
}
