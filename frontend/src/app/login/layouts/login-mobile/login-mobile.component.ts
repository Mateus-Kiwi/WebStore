import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../shared/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login-mobile',
  standalone: true,
  imports: [RouterModule, FormsModule, HttpClientModule],
  templateUrl: './login-mobile.component.html',
  styleUrl: './login-mobile.component.scss'
})

export class LoginMobileComponent {

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
