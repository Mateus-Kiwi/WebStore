import { UserData } from './user';

export interface OrderToCreate {
  basketId: string;
  deliveryMethodId: number;
  buyerEmail: string;
  shipToAddress: ShipToAddress;
}

export interface Order {
  id: number;
  buyerEmail: string;
  orderDate: string;
  shipToAddress: ShipToAddress;
  deliveryMethod: string;
  shippingPrice: number;
  orderItems: OrderItem[];
  subtotal: number;
  total: number;
  status: string;
}

export interface ShipToAddress {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface OrderItem {
  productId: number;
  productName: string;
  pictureUrl: any;
  price: number;
  quantity: number;
  quantityStock: number;
}
