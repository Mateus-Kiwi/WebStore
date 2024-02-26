import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CheckoutDesktopComponent } from './layouts/checkout-desktop/checkout-desktop.component';
import { CheckoutMobileComponent } from './layouts/checkout-mobile/checkout-mobile.component';
import { isMobile } from '../../utils/screen/screen-utils';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterModule, CheckoutDesktopComponent, CheckoutMobileComponent],
  template: `
    @if(isMobile) {
    <app-checkout-mobile />
    } @else {
    <app-checkout-desktop />
    }
  `,
})
export class CheckoutComponent {
  isMobile = isMobile();
}
