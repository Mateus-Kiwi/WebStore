import { Component } from '@angular/core';
import { CardComponent } from '../../../card/card.component';

@Component({
  selector: 'app-home-desktop',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './home-desktop.component.html',
  styleUrl: './home-desktop.component.scss'
})
export class HomeDesktopComponent {

}
