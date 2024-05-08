import { CommonModule } from '@angular/common';
import { Component, OnInit, Self, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgControl, ReactiveFormsModule, Validator, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Basket, BasketItem } from '../../../models/basket';
import { UserData } from '../../../models/user';
import { AccountService } from '../../../shared/account.service';

import { AuthService } from '../../../shared/auth.service';
import { ShoppingCartService } from '../../../shopping-cart/shopping-cart.service';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-checkout-desktop',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './checkout-desktop.component.html',
  styleUrl: './checkout-desktop.component.scss',
})
export class CheckoutDesktopComponent implements OnInit {

  userData: UserData | null = null;
  form!: FormGroup;
  fb = inject(FormBuilder);

  constructor(
    private auth: AuthService,
    public basketService: ShoppingCartService,
    public accountService: AccountService,

  ) {}

  nego(){
    var ney = "ney"

    if (ney == "ney") {
      console.log("eu acho que esse bicho ai eh meu pa seu buceta")
      console.log("rammmmm pá rammmm pa")
      console.log("voce eh o bichao msm")
    }
  }
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
