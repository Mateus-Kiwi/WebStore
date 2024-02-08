import { Component } from '@angular/core';
import { isMobile } from '../../utils/screen/screen-utils';
import { LoginMobileComponent } from './layouts/login-mobile/login-mobile.component';
import { LoginDesktopComponent } from './layouts/login-desktop/login-desktop.component';
import { HomeDesktopComponent } from "../home/layouts/home-desktop/home-desktop.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [LoginMobileComponent, LoginDesktopComponent, HomeDesktopComponent, RouterModule, CommonModule],
    template: `
  @if(isMobile) {
    <app-login-mobile/>
  }
  @else {
    <app-login-desktop/>
  }
  `,
})
export class LoginComponent {
  isMobile = isMobile();
}
