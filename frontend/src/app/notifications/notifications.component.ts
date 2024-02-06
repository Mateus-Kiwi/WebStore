import { Component } from '@angular/core';

import { isMobile } from '../../utils/screen/screen-utils';
import { NotificationsMobileComponent } from './layouts/notifications-mobile/notifications-mobile.component';
import { NotificationsDesktopComponent } from './layouts/notifications-desktop/notifications-desktop.component';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [NotificationsMobileComponent, NotificationsDesktopComponent],
  template: `
  @if (isMobile)
  {
    <app-notifications-mobile/>
  }
  @else
  {
    <app-notifications-desktop/>
  }`

})
export class NotificationsComponent {
  isMobile = isMobile();
}
