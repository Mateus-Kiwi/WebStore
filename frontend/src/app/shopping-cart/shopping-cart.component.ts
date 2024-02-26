import { Component } from '@angular/core';
import { isMobile } from '../../utils/screen/screen-utils';
import { CartDesktopComponent } from './layouts/cart-desktop/cart-desktop.component';
import { CartMobileComponent } from './layouts/cart-mobile/cart-mobile.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CartDesktopComponent, CartMobileComponent, RouterModule],
  template: `
    @if(isMobile) {
      <app-cart-mobile/>
    }
    @else {
      <app-cart-desktop/>
    }
  `,
})
export class ShoppingCartComponent {
  isMobile = isMobile();
}
