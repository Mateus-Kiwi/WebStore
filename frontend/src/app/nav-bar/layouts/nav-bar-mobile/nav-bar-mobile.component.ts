import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { Basket, BasketItem } from '../../../models/basket';
import { ShoppingCartService } from '../../../shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-nav-bar-mobile',
  standalone: true,
  imports: [RouterModule, CollapseModule, CommonModule],
  templateUrl: './nav-bar-mobile.component.html',
  styleUrl: './nav-bar-mobile.component.scss'
})
export class NavBarMobileComponent implements OnInit{

  basket: Basket[] = [];
  isCollapsed = true;

  constructor(private router: Router, public basketService: ShoppingCartService) { }
  ngOnInit(): void {

  }

  getCount(items: BasketItem[]) {
    return items.reduce((total, item) => total + item.quantity, 0);
  }
}
