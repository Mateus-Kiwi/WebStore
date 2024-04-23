import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NotificationsMobileComponent } from '../../../notifications/layouts/notifications-mobile/notifications-mobile.component';
import { ShoppingCartService } from '../../../shopping-cart/shopping-cart.service';
import { Basket } from '../../../models/basket';

@Component({
  selector: 'app-nav-bar-desktop',
  standalone: true,
  imports: [RouterModule, CollapseModule, CommonModule, NotificationsMobileComponent],
  templateUrl: './nav-bar-desktop.component.html',
  styleUrl: './nav-bar-desktop.component.scss'
})
export class NavBarDesktopComponent implements OnInit {
  basket?: Basket[];
  isCollapsed = true;

  constructor(private router: Router, public basketService: ShoppingCartService) { }
  ngOnInit(): void {
    this.loadBasket();
  }

  loadBasket(){
    let basketId = localStorage.getItem('basket_id');
    if(basketId){
      this.basketService.getBasket(basketId)
      return this.basketService.cartSource$
    }
  }
  // getNumber() {
  //   const basket = this.basketService.getBasket(this.basketService.);
  //   return number;
  // }

  navigateAndFocusSearch() {
    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        const searchInput = document.getElementById('search-input') as HTMLInputElement;

        if (searchInput) {
          searchInput.focus();
        }
      }, 100);
    });
  }
}
