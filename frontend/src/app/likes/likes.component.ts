import { Component } from '@angular/core';
import { isMobile } from '../../utils/screen/screen-utils';
import { LikesMobileComponent } from './layouts/likes-mobile/likes-mobile.component';
import { LikesDesktopComponent } from './layouts/likes-desktop/likes-desktop.component';

@Component({
  selector: 'app-likes',
  standalone: true,
  template: `@if (isMobile) {
    <app-likes-mobile/>
  }
  @else {
    <app-likes-desktop/>
  }`,
  imports: [LikesDesktopComponent,LikesMobileComponent]
})

export class LikesComponent {
isMobile = isMobile();
}
