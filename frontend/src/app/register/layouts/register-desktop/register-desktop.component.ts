import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../shared/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-desktop',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './register-desktop.component.html',
  styleUrl: './register-desktop.component.scss'
})
export class RegisterDesktopComponent {
  email : string = '';
  password : string = '';
  username : string = '';

  constructor (private auth : AuthService) { }
  ngOnInit(): void {}

  register(){

    if(this.email == '') {
      alert('Please enter a email');
    return;
    }

    if(this.password == '') {
      alert('Please enter a password');
    return;
    }

    if(this.username == '') {
      alert('Please enter a username');
    return;
    }

    this.auth.register(this.email, this.password, this.username);
    this.email = '';
    this.password = '';
    this.username= '';
  }
}
