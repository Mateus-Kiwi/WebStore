import { Component } from '@angular/core';
import { isMobile } from '../../utils/screen/screen-utils';
import { ProductDetailsDesktopComponent } from './Layouts/product-details-desktop/product-details-desktop.component';
import { ProductDetailsMobileComponent } from './Layouts/product-details-mobile/product-details-mobile.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [ProductDetailsDesktopComponent, ProductDetailsMobileComponent],
  template: `@if (isMobile) {
    <app-product-details-mobile />
    } @else {
    <app-product-details-desktop />
    }`
})
export class ProductDetailsComponent {
  isMobile = isMobile();
}
