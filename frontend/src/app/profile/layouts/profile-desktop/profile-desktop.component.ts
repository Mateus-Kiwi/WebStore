import { Component } from '@angular/core';
import { AuthService } from '../../../shared/auth.service';

@Component({
  selector: 'app-profile-desktop',
  standalone: true,
  imports: [],
  templateUrl: './profile-desktop.component.html',
  styleUrl: './profile-desktop.component.scss'
})
export class ProfileDesktopComponent {
  constructor (private auth : AuthService) { }

  logout(){
    this.auth.logout();
    location.reload();
  }
}
