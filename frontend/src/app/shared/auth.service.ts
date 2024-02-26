import { Injectable, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FirebaseApp } from 'firebase/app';
import { firebase } from '../../environments/firebase.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  constructor(private fireauth: AngularFireAuth, private router: Router) {}
  ngOnInit(): void {
    this.fireauth.onAuthStateChanged((user) => {
      console.log(user);
    })
  }



  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then((userCredential) => {

        localStorage.setItem('token', 'true');

        this.router.navigate(['/']);
        console.log('logged in');
      },
      (err) => {
        alert(err.message);
      }
    ); 
  }

  register(email: string, password: string, username: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
        const user = userCredential.user;
        const userId = user?.uid

        firebase.firestore().collection('users').doc(userId).set({
          name: username,
        })
        localStorage.setItem('token', 'true');
        console.log('user created');
        this.router.navigate(['/']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  logout() {
    this.fireauth.signOut().then(() => {
    localStorage.removeItem('token');
    localStorage.setItem('token', 'false');
    console.log('logged out');
    this.router.navigate(['/login']);
  })
}

   isLoggedIn() {

   }

}
