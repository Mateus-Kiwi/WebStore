import { Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';

import { LikesComponent } from './likes/likes.component';
import { LoginComponent } from './login/login.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { RegisterComponent } from './register/register.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { BillingComponent } from './billing/billing.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'likes', component: LikesComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'account', component: AccountComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'billing', component: BillingComponent },
  { path: 'confirmation', component: ConfirmationComponent },
];
