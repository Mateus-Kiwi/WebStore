import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Pagination } from '../models/pagination';
import { Brand } from '../models/brand';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  baseUrl = 'https://localhost:7052/api/'

  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get<Product[]>(this.baseUrl + 'products');
  }

  getProduct(id: number){
    return this.http.get<Product>(this.baseUrl + 'products/' + id);
  }

  getBrands(){
    return this.http.get<Brand[]>(this.baseUrl + 'brands');
  }

  getCategories(){
    return this.http.get<Category[]>(this.baseUrl + 'categories');
  }




  // getProducts(){
  //   return this.http.get<Pagination<Product[]>>(this.baseUrl + 'products/');
  // }
}
