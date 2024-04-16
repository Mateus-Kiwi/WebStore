import { Component, OnInit } from '@angular/core';
import { isMobile } from '../../utils/screen/screen-utils';
import { HomeMobileComponent } from './layouts/home-mobile/home-mobile.component';
import { HomeDesktopComponent } from './layouts/home-desktop/home-desktop.component';
import { HomeService } from './home.service';
import { Product } from '../models/product';


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
export class HomeComponent implements OnInit{



  constructor() { }

  ngOnInit(): void {
  }
  isMobile = isMobile();
}
