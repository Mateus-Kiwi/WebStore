import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { isMobile } from '../../utils/screen/screen-utils';
import { LoginComponent } from '../login/login.component';
import { CheckoutDesktopComponent } from './layouts/checkout-desktop/checkout-desktop.component';
import { CheckoutMobileComponent } from './layouts/checkout-mobile/checkout-mobile.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    RouterModule,
    CheckoutDesktopComponent,
    CheckoutMobileComponent,
    LoginComponent,
  ],
  template: ` @if(!isLogged){
    <app-login />
    } @else { @if(isMobile) {
    <app-checkout-mobile />
    } @else {
    <app-checkout-desktop />
    } }`,
})
export class CheckoutComponent {
  isMobile = isMobile();

  token = localStorage.getItem('token');

  protected get isLogged(): boolean {
    if (this.token !== 'true') {
      return false;
    }

    return true;
  }
}
