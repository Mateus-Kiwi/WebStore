import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Pagination } from '../models/pagination';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  baseUrl = 'https://localhost:7052/api/'

  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get<Product[]>(this.baseUrl + 'products/');
  }
  // getProducts(){
  //   return this.http.get<Pagination<Product[]>>(this.baseUrl + 'products/');
  // }
}
