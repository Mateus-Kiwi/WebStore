import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../../card/card.component';
import { Product } from '../../../models/product';
import { HomeService } from '../../home.service';
import { Pagination } from '../../../models/pagination';

@Component({
  selector: 'app-home-desktop',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './home-desktop.component.html',
  styleUrl: './home-desktop.component.scss',
})
export class HomeDesktopComponent implements OnInit {
  constructor(private homeService: HomeService) {}

  products: Product[] = []

  ngOnInit(): void {
    this.homeService.getProducts().subscribe((products) => {
      this.products = products;
    });

    // this.homeService.getProducts().subscribe((pagination: Pagination<Product[]>) => {
    //   this.products = pagination.data;
    // });
  }
}
