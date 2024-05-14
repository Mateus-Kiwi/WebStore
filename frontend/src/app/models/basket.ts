import cuid from "cuid"

  export interface BasketItem {
    id: number
    name: string
    description: string
    price: number
    quantity: number
    inventory: number
    imgUrl: string
    brandId: number
    categoryId: number
  }

  export interface Basket {
    id: string;
    items: BasketItem[];
    clientSecret?: string;
    paymentIntentId?: string;
    deliveryMethodId?: number;
    // shippingPrice: number
  }

  export class Basket implements Basket {
    id = cuid();
    items: BasketItem[] = [];
    shippingPrice = 0;
  }

  export interface BasketTotals{
    shipping: number;
    subtotal: number;
    total: number;
  }
