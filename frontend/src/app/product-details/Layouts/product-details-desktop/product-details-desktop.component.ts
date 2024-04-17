import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { HomeService } from '../../../home/home.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details-desktop',
  standalone: true,
  imports: [],
  templateUrl: './product-details-desktop.component.html',
  styleUrl: './product-details-desktop.component.scss',
})
export class ProductDetailsDesktopComponent implements OnInit {
  product?: Product;

  constructor(
    private homeService: HomeService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  loadProduct() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id)
      this.homeService.getProduct(+id).subscribe((product) => {
        this.product = product;
      });
  }
}
