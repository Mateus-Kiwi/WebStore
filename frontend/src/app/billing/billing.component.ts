import { Component } from '@angular/core';
import { isMobile } from '../../utils/screen/screen-utils';
import { RouterModule } from '@angular/router';
import { BillingDesktopComponent } from './billing-desktop/billing-desktop.component';
import { BillingMobileComponent } from './billing-mobile/billing-mobile.component';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [RouterModule, BillingDesktopComponent, BillingMobileComponent],
  template: `
    @if(isMobile) {
    <app-billing-mobile />
    } @else {
    <app-billing-desktop />
    }
  `,
})
export class BillingComponent {
  isMobile = isMobile();
}
