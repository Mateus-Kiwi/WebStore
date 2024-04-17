import { Component, OnInit } from '@angular/core';
import { RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CardComponent } from './card/card.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, FontAwesomeModule, RouterModule, RouterLinkActive, CardComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig }],
})
export class AppComponent implements OnInit {
  title = 'frontend';

  
  constructor() { }

  ngOnInit(): void {

  }
}
