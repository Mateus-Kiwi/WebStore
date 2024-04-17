import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../home.service';
import { Product } from '../../../models/product';
import { CardComponent } from '../../../card/card.component';

@Component({
  selector: 'app-home-mobile',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './home-mobile.component.html',
  styleUrl: './home-mobile.component.scss'
})
export class HomeMobileComponent implements OnInit{
  constructor(private homeService: HomeService) {}

  products: Product[] = []

  ngOnInit(): void {
    this.homeService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }
}
