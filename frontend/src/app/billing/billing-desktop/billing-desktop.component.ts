import { CheckoutService } from '../../shared/checkout.service';
import { Component, Input, OnInit, inject, input } from '@angular/core';
import { NavigationExtras, RouterModule } from '@angular/router';
import { Basket, BasketItem } from '../../models/basket';
import { ShoppingCartService } from '../../shopping-cart/shopping-cart.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderToCreate } from '../../models/order';
import { UserData } from '../../models/user';
import { AccountService } from '../../shared/account.service';

@Component({
  selector: 'app-billing-desktop',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './billing-desktop.component.html',
  styleUrl: './billing-desktop.component.scss'
})
export class BillingDesktopComponent implements OnInit{

  userData: UserData | null = null;
  basket: Basket[] = [];
  form!: FormGroup;
  fb = inject(FormBuilder);
  @Input() checkoutForm?: FormGroup;

  constructor(public basketService: ShoppingCartService, private accountService: AccountService, private checkoutService: CheckoutService) { }
  ngOnInit(): void {
    this.createForm();

    const userId = localStorage.getItem('userId');
    if (userId) {
      this.accountService.getUser(userId).then((user: UserData | null) => {
        if (user) {
          this.userData = user;
        }
      });
    }
  }

  // async submitOrder() {
  //   this.loading = true;
  //   const basket = this.basketService.getCurrentBasketValue();
  //   if (!basket) throw new Error('cannot get basket');
  //   try {
  //     const createdOrder = await this.createOrder(basket);
  //     const paymentResult = await this.confirmPaymentWithStripe(basket);
  //     if (paymentResult.paymentIntent) {
  //       this.basketService.deleteBasket(basket);
  //       const navigationExtras: NavigationExtras = {state: createdOrder};
  //       this.router.navigate(['checkout/success'], navigationExtras);
  //     } else {

  //     }
  //   } catch (error: any) {
  //     console.log(error);

  //   } finally {
  //     this.loading = false;
  //   }
  // }



  submitOrder() {
    const basket = this.basketService.getCurrentBasketValue();
    if(!basket) return;
    const orderToCreate = this.getOrderToCreate(basket);
    if(!orderToCreate) return;
    this.checkoutService.createOrder(orderToCreate).subscribe({
      next: order => {
        console.log(order);
      }
    })
  }

   getOrderToCreate(basket: Basket): OrderToCreate {
    const deliveryMethodId = 3
    var email = ''
    if (this.userData?.email) {
      email = this.userData.email;
    }
    const shipToAddress = this.userData;

    if (!deliveryMethodId || !shipToAddress) throw new Error('Problem goyilutgforf');
    return {
      basketId: basket.id,
      deliveryMethodId: deliveryMethodId,
      buyerEmail : email,
      shipToAddress: shipToAddress
    }
  }


  createForm(): void {
    this.form = this.fb.group({
      nameOnCard: ['', Validators.required],
    });
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

  incrementQuantity(item: BasketItem) {
    this.basketService.addItemToBasket(item);
  }

  removeItem(id: number, quantity?: number) {
    this.basketService.removeFromBasket(id);
  }

  deleteBasket(basket: Basket){
    this.basketService.deleteBasket(basket)
  }
}
