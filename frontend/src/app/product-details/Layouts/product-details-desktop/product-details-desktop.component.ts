import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { HomeService } from '../../../home/home.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ShoppingCartService } from '../../../shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-product-details-desktop',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './product-details-desktop.component.html',
  styleUrl: './product-details-desktop.component.scss',
})
export class ProductDetailsDesktopComponent implements OnInit {
  product?: Product;

  constructor(
    private basketService: ShoppingCartService,
    private homeService: HomeService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  addItemToBasket() {
    this.product && this.basketService.addItemToBasket(this.product);
  }

  loadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.homeService.getProduct(+id).subscribe((product) => {
        this.product = product;
      });
    }
  }
}
