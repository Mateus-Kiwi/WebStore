import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Basket, BasketItem } from '../../../models/basket';
import { ShoppingCartService } from '../../shopping-cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-mobile',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './cart-mobile.component.html',
  styleUrl: './cart-mobile.component.scss'
})
export class CartMobileComponent {
  basket: Basket[] = [];

  constructor(public basketService: ShoppingCartService) { }


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
