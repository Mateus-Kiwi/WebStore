import { Component } from '@angular/core';
import { AuthService } from '../../../shared/auth.service';

@Component({
  selector: 'app-profile-mobile',
  standalone: true,
  imports: [],
  templateUrl: './profile-mobile.component.html',
  styleUrl: './profile-mobile.component.scss'
})
export class ProfileMobileComponent {
  constructor (private auth : AuthService) { }

  logout(){
    this.auth.logout();
    location.reload();
  }
}
