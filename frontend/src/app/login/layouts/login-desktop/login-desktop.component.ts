import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../shared/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-desktop',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login-desktop.component.html',
  styleUrl: './login-desktop.component.scss'
})
export class LoginDesktopComponent {
  email : string = '';
  password : string = '';

  constructor (private auth : AuthService) { }
  ngOnInit() {}

  login(){

    if(this.email == '') {
      alert('Please enter your email');
    return;
    }

    if(this.password == '') {
      alert('Please enter your password');
    return;
    }

    this.auth.login(this.email, this.password);
    this.email = '';
    this.password = '';
  }



}
