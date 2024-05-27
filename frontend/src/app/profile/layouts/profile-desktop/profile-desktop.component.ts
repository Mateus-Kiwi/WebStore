import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/auth.service';
import { UserData } from '../../../models/user';
import { AccountService } from '../../../shared/account.service';
import { user } from '@angular/fire/auth';
import { Order } from '@stripe/stripe-js';

@Component({
  selector: 'app-profile-desktop',
  standalone: true,
  imports: [],
  templateUrl: './profile-desktop.component.html',
  styleUrl: './profile-desktop.component.scss'
})
export class ProfileDesktopComponent implements OnInit{
  userData: UserData | null = null;
  orders: Order[] = []
  firstLetter: string | undefined;

  constructor(
    private auth: AuthService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.accountService.getUser(userId).then((user: UserData | null) => {
        if (user) {
          this.userData = user;
          var email = user.email
          this.firstLetter = this.getUsernameFirstLetter(user.displayName);
          if (email){
            this.getOrdersFromUser(email);
          }

        }
      });
    }
  }

  getUsernameFirstLetter(displayName: string | undefined){
    if (!displayName) return undefined;
    return displayName.charAt(0);
  }

  getOrdersFromUser(userEmail: string) {
    if (userEmail) {
      var orders = this.accountService.getUsersOrders(userEmail)
      return orders
    }
    return
  }

  logout() {
    this.auth.logout();
    location.reload();
  }
}
