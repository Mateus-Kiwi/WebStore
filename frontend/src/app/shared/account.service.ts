import { Injectable } from '@angular/core';

import { firebase } from '../../environments/firebase.config';
import { UserData } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor() {}

  getUser(userId: string): Promise<UserData | null> {
    return firebase
      .firestore()
      .collection('users')
      .doc(userId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data() as UserData;
          return userData;
        } else {
          console.log('User not found');
          return null;
        }
      });
  }

  // getEmail(userId: string) {
  //   return firebase
  //     .firestore()
  //     .collection('users')
  //     .doc(userId)
  //     .get()
  //     .then((doc) => {
  //       if (doc.exists) {
  //         const userData = doc.data() as UserData;
  //         console.log(userData.email);
  //         return userData.email;
  //       } else {
  //         console.log('neogney');
  //         return null;
  //       }
  //     });
  // }

  getEmail(userId: string) {
    return firebase
      .firestore()
      .collection('users')
      .doc(userId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          if (userData) {
            return userData['email'];
          } else {
            return null;
          }
        }
      });
  }
}
