import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AppUIUtilsService } from 'src/app/services/app.ui.utils.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss'],
})
export class ConfirmEmailComponent implements OnInit {


  private PutOK:any  = null;
  private PutError:any  = null;
  private getOK:any  = null;

  private urlTree:any  = null;
  private id:any  = null;

  constructor(
    private user: UsuarioService,
    private router: Router,
    public  gral:   AppUIUtilsService,
  ) { 
    this.urlTree = this.router.parseUrl(this.router.url);
    this.id = this.urlTree.queryParams['id'];
  }

  ngOnInit() {
      this.user.verificationEmail(this.id);

      this.PutOK = this.user.verificationEmailOK.subscribe({  next: ( params: any ) => {
       if(params["status"]){
          this.gral.dismissLoading();
          this.gral.showMessage('Datos actualizados');
       }else{
          this.gral.dismissLoading();
          this.gral.showMessage('Ocurrió un error, reintente más tarde.');
       }
      } });

      this.PutError = this.user.verificationEmailError.subscribe({  next: ( params: any ) => {
      this.gral.dismissLoading();
      this.gral.showMessage('Ocurrió un error, reintente más tarde.');
      } });
  }

}
