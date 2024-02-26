import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../shared/auth.service';

@Component({
  selector: 'app-register-mobile',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './register-mobile.component.html',
  styleUrl: './register-mobile.component.scss'
})
export class RegisterMobileComponent {
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
