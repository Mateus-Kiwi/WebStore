import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { isMobile } from '../../utils/screen/screen-utils';
import { NavBarMobileComponent } from "./layouts/nav-bar-mobile/nav-bar-mobile.component";
import { NavBarDesktopComponent } from "./layouts/nav-bar-desktop/nav-bar-desktop.component";


@Component({
    selector: 'app-nav-bar',
    standalone: true,
    template: `
  @if (isMobile) {
    <app-nav-bar-mobile/>
  }
  @else {
    <app-nav-bar-desktop/>
  }`,
    imports: [RouterModule, CollapseModule, CommonModule, NavBarMobileComponent, NavBarDesktopComponent]
})
export class NavBarComponent {
  isMobile = isMobile();
}
