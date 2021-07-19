import { Component, OnInit } from '@angular/core';
import { ResetPassword } from 'src/app/models/reset-password';
import { AppUIUtilsService } from 'src/app/services/app.ui.utils.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {

  public resetPass: ResetPassword = new ResetPassword();

  private PostOK:any  = null;
  private PostError:any  = null;
  

  constructor(
    public  gral:   AppUIUtilsService,
    private auth:   AuthService,
    private user: UsuarioService
  ) {
   }

  ngOnInit() {}

  next(){
    this.auth.resetPasswordEmail(this.resetPass);

    this.PostOK = this.auth.resetPasswordEmailOK.subscribe({  next: ( params: any ) => {
      this.gral.dismissLoading();
      this.gral.showMessage('Email enviado');
      this.user.goToProfile();
      } });

      this.PostError = this.auth.resetPasswordEmailError.subscribe({  next: ( params: any ) => {
      this.gral.dismissLoading();
      this.gral.showMessage('Ocurrió un error, reintente más tarde.');
      } });
  }

}
