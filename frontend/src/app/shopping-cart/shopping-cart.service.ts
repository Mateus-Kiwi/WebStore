import { Basket, BasketItem } from './../models/basket';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})

export class ShoppingCartService {
  baseUrl = environment.apiUrl;
  private cartSource = new BehaviorSubject<Basket>(null as any);
  cartSource$ = this.cartSource.asObservable();


  constructor(private http: HttpClient) {}

  getBasket(id: string) {
    return this.http.get<Basket>(this.baseUrl + 'basket/' + id).subscribe({
      next: (basket) => this.cartSource.next(basket),
    });
  }

  setBasket(basket: Basket) {
    return this.http.post<Basket>(this.baseUrl + 'basket', basket).subscribe({
      next: (basket) => this.cartSource.next(basket),
    });
  }

  getCurrentBasketValue() {
    return this.cartSource.value
  }

  addItemToBasket(item: Product, quantity = 1) {
    const itemToAdd = this.mapProductToBasketItem(item)
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }

  addOrUpdateItem(items: BasketItem[], itemToAdd: BasketItem, quantity: number): BasketItem[] {
    const item = items.find(x => x.id === itemToAdd.id);
    if (item) item.quantity += quantity;
    else {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd)
    }
    return items
  }

  private createBasket(): Basket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private mapProductToBasketItem(item: Product): BasketItem {
    return{
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 0,
      inventory: 0,
      imgUrl: item.imgUrl,
      brandId: item.brandId,
      categoryId: item.categoryId
    }
  }

}
