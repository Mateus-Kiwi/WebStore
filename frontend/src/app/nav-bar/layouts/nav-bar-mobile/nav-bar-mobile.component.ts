import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap/collapse';

@Component({
  selector: 'app-nav-bar-mobile',
  standalone: true,
  imports: [RouterModule, CollapseModule, CommonModule],
  templateUrl: './nav-bar-mobile.component.html',
  styleUrl: './nav-bar-mobile.component.scss'
})
export class NavBarMobileComponent {

}
