import { UserData } from './../../../models/user';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../shared/auth.service';
import { Basket, BasketItem } from '../../../models/basket';
import { ShoppingCartService } from '../../../shopping-cart/shopping-cart.service';
import { CommonModule } from '@angular/common';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-checkout-mobile',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './checkout-mobile.component.html',
  styleUrl: './checkout-mobile.component.scss'
})
export class CheckoutMobileComponent {
  userData: UserData | null = null;

  basket: Basket[] = [];

  constructor(private auth: AuthService, public basketService: ShoppingCartService) {}

  updateAddress(){
    const userId = localStorage.getItem('userId');
    if (userId && this.userData) {
      this.auth.updateUserProfile(userId, this.userData);
    }
  }

  getCount(items: BasketItem[]) {
    return items.reduce((total, item) => total + item.quantity, 0);
  }

  getSubtotal(items: BasketItem[]) {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  getTotal(items: BasketItem[]) {
    return this.getSubtotal(items) + 10
  }
}
