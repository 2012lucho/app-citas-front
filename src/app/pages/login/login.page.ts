import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router }            from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

import { Login }         from '../../models/login';

import { AuthService }     from '../../services/auth/auth.service';
import { UserService }     from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.sass']
})
export class LoginPage implements OnInit {

  @ViewChild('pass', { read: ElementRef, static:false }) passInput: ElementRef;
  public login:Login = new Login();

  constructor(
    private auth:   AuthService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    if ( this.auth.logedIn() ){
      if ( this.auth.getVerificationEmailStatus ){
        this.userService.setOnlineStatus( true );
        this.router.navigate(['/tabs/tabs/chats']);
      }else{
        this.userService.setOnlineStatus( false );
        this.router.navigate( [ '/verification-email' ] );
      }
    }
  }

  next(){
    this.auth.login( this.login );
  }

  keyPress( e, input ){
    if (e.key == "Enter"){
      
      if (input == "pass") {
        this.next();
      }

      if (input == "email"){
        setTimeout(()=>{
          this.passInput.nativeElement.focus();
        },100);
      }
    }
  }

}
