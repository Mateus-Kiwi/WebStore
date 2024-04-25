import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShoppingCartService } from '../../shopping-cart.service';
import { CommonModule } from '@angular/common';
import { Basket, BasketItem } from '../../../models/basket';

@Component({
  selector: 'app-cart-desktop',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './cart-desktop.component.html',
  styleUrl: './cart-desktop.component.scss'
})
export class CartDesktopComponent {

  basket: Basket[] = [];

  constructor(public basketService: ShoppingCartService) { }


  getCount(items: BasketItem[]) {
    return items.reduce((total, item) => total + item.quantity, 0);
  }

  getSubtotal(items: BasketItem[]) {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
