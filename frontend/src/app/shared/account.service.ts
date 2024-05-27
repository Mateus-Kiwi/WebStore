import { Injectable } from '@angular/core';

import { firebase } from '../../environments/firebase.config';
import { UserData } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = 'https://localhost:7052/api/'

  constructor(private http: HttpClient) {}

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

  getUsersOrders(buyerEmail: string) {
    return this.http.get<Order[]>(this.baseUrl + 'order/email/' + buyerEmail)
  }

}
