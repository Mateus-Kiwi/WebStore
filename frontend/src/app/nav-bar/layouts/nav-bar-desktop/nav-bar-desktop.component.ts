import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NotificationsMobileComponent } from '../../../notifications/layouts/notifications-mobile/notifications-mobile.component';

@Component({
  selector: 'app-nav-bar-desktop',
  standalone: true,
  imports: [RouterModule, CollapseModule, CommonModule, NotificationsMobileComponent],
  templateUrl: './nav-bar-desktop.component.html',
  styleUrl: './nav-bar-desktop.component.scss'
})
export class NavBarDesktopComponent {
  isCollapsed = true;

  constructor(private router: Router) { }

  navigateAndFocusSearch() {
    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        const searchInput = document.getElementById('search-input') as HTMLInputElement;

        if (searchInput) {
          searchInput.focus();
        }
      }, 100);
    });
  }
}
