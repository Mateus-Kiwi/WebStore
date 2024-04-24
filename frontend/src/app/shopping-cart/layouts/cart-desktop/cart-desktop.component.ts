import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShoppingCartService } from '../../shopping-cart.service';

@Component({
  selector: 'app-cart-desktop',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './cart-desktop.component.html',
  styleUrl: './cart-desktop.component.scss'
})
export class CartDesktopComponent {

  constructor(public basketService: ShoppingCartService) { }

}
