import { Component } from '@angular/core';
import { isMobile } from '../../utils/screen/screen-utils';
import { RegisterDesktopComponent } from './layouts/register-desktop/register-desktop.component';
import { RegisterMobileComponent } from './layouts/register-mobile/register-mobile.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RegisterDesktopComponent, RegisterMobileComponent],
  template: `
    @if(isMobile) {
      <app-register-mobile/>
    }
    @else {
      <app-register-desktop/>
    }
  `,

})
export class RegisterComponent {
  isMobile = isMobile();
}
