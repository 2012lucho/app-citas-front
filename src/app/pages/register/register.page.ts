import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Register } from 'src/app/models/register';
import { AppUIUtilsService } from 'src/app/services/app.ui.utils.service';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Login } from 'src/app/models/login';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public register = new Register();
  public model = new Usuario();
  public login = new Login();

  public registerForm: FormGroup;

  private PostOK:any  = null;
  private PostError:any  = null;

  constructor(
    private router: Router,
    private auth:   AuthService,
    private user: UsuarioService,
    public  gral:   AppUIUtilsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  next(){
    if(this.registerForm.valid){
      this.model.username = this.register.username;
      this.model.email = this.register.email;
      this.model.password = this.register.password;
      this.auth.register(this.model);

      this.login.username = this.model.username;
      this.login.password = this.model.password;

      this.PostOK = this.auth.registerOK.subscribe({  next: ( params: any ) => {
      if(params["status"]){
        this.gral.dismissLoading();
        this.gral.showMessage('Datos actualizados');
        this.auth.login(this.login);
      }else{
        this.gral.dismissLoading();
        this.gral.showMessage('Ocurrió un error, reintente más tarde.');
      }
      } });

      this.PostError = this.auth.registerError.subscribe({  next: ( params: any ) => {
      this.gral.dismissLoading();
      this.gral.showMessage('Ocurrió un error, reintente más tarde.');
      } });
    
    }
 }

}
