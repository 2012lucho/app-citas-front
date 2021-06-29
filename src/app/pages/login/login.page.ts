import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Login }         from '../../models/login';

import { AuthService }     from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.sass']
})
export class LoginPage implements OnInit {

  public login:Login = new Login();

  constructor(
    private auth:   AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if ( this.auth.logedIn() ){
      this.router.navigate(['/tabs/tabs/chats']);
    }
  }

  next(){
    this.auth.login( this.login );
  }

}
