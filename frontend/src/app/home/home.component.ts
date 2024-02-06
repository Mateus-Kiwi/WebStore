import { Component } from '@angular/core';
import { isMobile } from '../../utils/screen/screen-utils';
import { HomeMobileComponent } from './layouts/home-mobile/home-mobile.component';
import { HomeDesktopComponent } from './layouts/home-desktop/home-desktop.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeMobileComponent, HomeDesktopComponent],
  template: `
    @if(isMobile) {
      <app-home-mobile/>
    }
    @else {
      <app-home-desktop/>
    }
  `,
})
export class HomeComponent {
  isMobile = isMobile();
}
