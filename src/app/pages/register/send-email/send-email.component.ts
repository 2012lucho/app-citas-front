import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/models/login';
import { AppUIUtilsService } from 'src/app/services/app.ui.utils.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss'],
})
export class SendEmailComponent implements OnInit {

  public usuario: any= this.auth.getUserName();
  public id: any= this.auth.getUserId();
  public model = new Login();

  private PutOK:any  = null;
  private PutError:any  = null;

  constructor(
    private auth: AuthService,
    private user: UsuarioService,
    public  gral:   AppUIUtilsService,
  ) { }

  ngOnInit() {
  }

  next(){
    this.model.username= this.usuario;
    this.user.resendVerificationEmail(this.id, this.model);
    
    this.PutOK = this.user.resendVerificationEmailOK.subscribe({  next: ( params: any ) => {
      if(params["status"]){
        this.gral.dismissLoading();
        this.gral.showMessage('Datos actualizados');
      }else{
        this.gral.dismissLoading();
        this.gral.showMessage('Ocurrió un error, reintente más tarde.');
      }
      } });

    this.PutError = this.user.resendVerificationEmailError.subscribe({  next: ( params: any ) => {
      this.gral.dismissLoading();
      this.gral.showMessage('Ocurrió un error, reintente más tarde.');
      } });
  }

}
