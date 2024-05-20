import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/auth.service';
import { UserData } from '../../../models/user';
import { AccountService } from '../../../shared/account.service';

@Component({
  selector: 'app-profile-mobile',
  standalone: true,
  imports: [],
  templateUrl: './profile-mobile.component.html',
  styleUrl: './profile-mobile.component.scss',
})
export class ProfileMobileComponent implements OnInit {
  userData: UserData | null = null;
  firstLetter: string | undefined;

  constructor(
    private auth: AuthService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.accountService.getUser(userId).then((user: UserData | null) => {
        if (user) {
          this.userData = user;
          this.firstLetter = this.getUsernameFirstLetter(user.displayName);
        }
      });
    }
  }

  getUsernameFirstLetter(displayName: string | undefined){
    if (!displayName) return undefined;
    return displayName.charAt(0);
  }

  logout() {
    this.auth.logout();
    location.reload();
  }
}
