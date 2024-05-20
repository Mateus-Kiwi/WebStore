import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { NavigationExtras, Router, RouterModule } from '@angular/router';
import { Basket, BasketItem } from '../../models/basket';
import { ShoppingCartService } from '../../shopping-cart/shopping-cart.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserData } from '../../models/user';
import { Stripe, StripeCardCvcElement, StripeCardExpiryElement, StripeCardNumberElement, loadStripe } from '@stripe/stripe-js';
import { AccountService } from '../../shared/account.service';
import { CheckoutService } from '../../shared/checkout.service';
import { OrderToCreate } from '../../models/order';

@Component({
  selector: 'app-billing-mobile',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './billing-mobile.component.html',
  styleUrl: './billing-mobile.component.scss'
})
export class BillingMobileComponent implements OnInit {
  userData: UserData | null = null;
  basket: Basket[] = [];
  paymentForm!: FormGroup;
  fb = inject(FormBuilder);
  @ViewChild('cardNumber') cardNumberElement?: ElementRef;
  @ViewChild('cardExpiry') cardExpiryElement?: ElementRef;
  @ViewChild('cardCvc') cardCvcElement?: ElementRef;
  stripe: Stripe | null = null;
  cardNumber?: StripeCardNumberElement;
  cardExpiry?: StripeCardExpiryElement;
  cardCvc?: StripeCardCvcElement;

  constructor(
    public basketService: ShoppingCartService,
    private accountService: AccountService,
    private checkoutService: CheckoutService,
    private router: Router
  ) {}
  ngOnInit(): void {
    setTimeout(() => {
      loadStripe('pk_test_51PG31IEIjZzxLlEYIHdaxaTs1vy3uJq8ZBFoy2bDO3zVTEswau3ukVAobBNUsdIWC5p6hFReMq8x7Wj6W3icGugS00T0JQNVsG').then(stripe => {
        this.stripe = stripe;
        const elements = stripe?.elements();
        if(elements) {
          this.cardNumber = elements.create('cardNumber');
          this.cardNumber.mount(this.cardNumberElement?.nativeElement);

          this.cardExpiry = elements.create('cardExpiry');
          this.cardExpiry.mount(this.cardExpiryElement?.nativeElement);

          this.cardCvc = elements.create('cardCvc');
          this.cardCvc.mount(this.cardCvcElement?.nativeElement);
        }
      });
    }, 500);

    const userId = localStorage.getItem('userId');

    if (userId) {
      this.accountService.getUser(userId).then((user: UserData | null) => {
        if (user) {
          this.userData = user;
        }
      });
    }
  }

  submitOrder() {
    const basket = this.basketService.getCurrentBasketValue();
    if (!basket) return;
    const orderToCreate = this.getOrderToCreate(basket);
    if (!orderToCreate) return;
    this.checkoutService.createOrder(orderToCreate).subscribe({
      next: (order) => {
        console.log(order);
        this.stripe
          ?.confirmCardPayment(basket.clientSecret!, {
            payment_method: {
              card: this.cardNumber!,
              billing_details: {
                name: this.checkoutForm?.get('paymentForm')?.get('nameOnCard')
                  ?.value!,
              },
            },
          })
          .then((result) => {
            console.log(result);
            if (result.paymentIntent) {
              this.basketService.deleteLocalBasket();
              const navigationExtras: NavigationExtras = { state: order };
              this.router.navigate(['confirmation'], navigationExtras);
            }
          });
      },
    });
  }



  getOrderToCreate(basket: Basket): OrderToCreate {
    const deliveryMethodId = 1;
    var email = '';
    if (this.userData?.email) {
      email = this.userData.email;
    }
    const shipToAddress = {
      firstName: this.userData?.firstName ?? '',
      lastName: this.userData?.lastName ?? '',
      street: this.userData?.street ?? '',
      city: this.userData?.city ?? '',
      state: this.userData?.state ?? '',
      zipCode: this.userData?.zipCode ?? '',
    };
    if (!deliveryMethodId || !shipToAddress || !email)
      throw new Error('Error creating order');
    return {
      basketId: basket.id,
      deliveryMethodId: deliveryMethodId,
      buyerEmail: email,
      shipToAddress: shipToAddress,
    };
  }

  checkoutForm = this.fb.group({
    paymentForm: this.fb.group({
      nameOnCard: ['', Validators.required]
    }),
  })




  getCount(items: BasketItem[]) {
    return items.reduce((total, item) => total + item.quantity, 0);
  }

  getSubtotal(items: BasketItem[]) {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  getTotal(items: BasketItem[]) {
    return this.getSubtotal(items) + 10;
  }

  incrementQuantity(item: BasketItem) {
    this.basketService.addItemToBasket(item);
  }

  removeItem(id: number, quantity?: number) {
    this.basketService.removeFromBasket(id);
  }

  deleteBasket(basket: Basket) {
    this.basketService.deleteBasket(basket);
  }
}
