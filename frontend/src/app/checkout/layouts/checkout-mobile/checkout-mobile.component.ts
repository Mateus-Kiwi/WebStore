import { UserData } from './../../../models/user';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../shared/auth.service';
import { Basket, BasketItem } from '../../../models/basket';
import { ShoppingCartService } from '../../../shopping-cart/shopping-cart.service';
import { CommonModule } from '@angular/common';
import { user } from '@angular/fire/auth';
import { AccountService } from '../../../shared/account.service';

@Component({
  selector: 'app-checkout-mobile',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './checkout-mobile.component.html',
  styleUrl: './checkout-mobile.component.scss'
})
export class CheckoutMobileComponent {
  basket: Basket[] = [];
  userData: UserData | null = null;
  form!: FormGroup;
  fb = inject(FormBuilder);

  constructor(
    private auth: AuthService,
    public basketService: ShoppingCartService,
    public accountService: AccountService,

  ) {}
  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.accountService.getUser(userId).then((user: UserData | null) => {
        if (user) {
          this.userData = user;
        }
      });
    }

    this.createForm();
  }

  updateAddress() {
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
    return this.getSubtotal(items) + 10;
  }

  createForm(): void {
    this.form = this.fb.group({
      firstName: [this.userData?.firstName, Validators.required],
      lastName: [this.userData?.lastName, Validators.required],
      address: [this.userData?.address, Validators.required],
      city: [this.userData?.city, Validators.required],
      state: [this.userData?.state, Validators.required],
      zipCode: [this.userData?.zipCode, Validators.required],
      country: [this.userData?.country, Validators.required],
    });
  }
}
