import { Basket, BasketItem, BasketTotals } from './../models/basket';
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
  private cartSource = new BehaviorSubject<Basket | null>(null);
  cartSource$ = this.cartSource.asObservable();
  private cartTotalSource = new BehaviorSubject<BasketTotals | null>(null);
 cartTotalSource$ = this.cartTotalSource.asObservable();

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

  addItemToBasket(item: Product | BasketItem, quantity = 1) {
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

  removeFromBasket(id: number, quantity = 1) {
    const basket = this.getCurrentBasketValue()
    if (!basket) return;
    const item = basket.items.find(x => x.id === id);
    if (item) {
      item.quantity -= quantity;
      if (item.quantity === 0) {
        basket.items = basket.items.filter(x => x.id !== id);
      }
      if (basket.items.length > 0) this.setBasket(basket);
      else this.deleteBasket(basket)
    }
  }

  deleteBasket(basket: Basket) {
    return this.http.delete(this.baseUrl + 'basket/' + basket.id).subscribe({
      next: () => {
        this.deleteLocalBasket();
      }
    })
  }

  deleteLocalBasket() {
    this.cartSource.next(null);
    this.cartTotalSource.next(null);
    localStorage.removeItem('basket_id')
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
      description: item.description,
      price: item.price,
      quantity: 0,
      inventory: 0,
      imgUrl: item.imgUrl,
      brandId: item.brandId,
      categoryId: item.categoryId
    }
  }
}
