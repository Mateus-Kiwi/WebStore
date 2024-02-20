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

  constructor (private auth : AuthService) { }
  ngOnInit(): void {}

  register(){

    if(this.email == '') {
      alert('Please enter your email');
    return;
    }

    if(this.password == '') {
      alert('Please enter your password');
    return;
    }

    this.auth.register(this.email, this.password);
    this.email = '';
    this.password = '';
  }
}
