import { Component } from '@angular/core';
import { isMobile } from '../../utils/screen/screen-utils';
import { ProfileDesktopComponent } from './layouts/profile-desktop/profile-desktop.component';
import { ProfileMobileComponent } from './layouts/profile-mobile/profile-mobile.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ProfileDesktopComponent, ProfileMobileComponent],
  template: `@if (isMobile) {
    <app-profile-mobile/>
  }
  @else {
    <app-profile-desktop/>
  }`,
})
export class ProfileComponent {


  isMobile = isMobile();

  token = localStorage.getItem('token');
}
