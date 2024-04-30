import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../shared/auth.service';

@Component({
  selector: 'app-checkout-mobile',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './checkout-mobile.component.html',
  styleUrl: './checkout-mobile.component.scss'
})
export class CheckoutMobileComponent {
  firstName : string = '';
  lastName : string = '';
  address: string = '';
  city: string = '';
  state: string = '';
  zipCode: string = '';
  country: string = '';

  constructor(private auth: AuthService) {}

  updateAddress(){
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.auth.updateUserProfile(userId, this.firstName, this.lastName, this.address, this.city, this.state, this.zipCode, this.country);
    }
  }
}
