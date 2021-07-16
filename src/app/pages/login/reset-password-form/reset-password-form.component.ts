import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ConfigService } from 'src/app/services/config.service';
import { AppUIUtilsService } from 'src/app/services/app.ui.utils.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ValidatorService } from 'src/app/services/validator.service';
import { ResetPasswordForm } from 'src/app/models/reset-password-form';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.scss'],
})
export class ResetPasswordFormComponent implements OnInit {

  public resetPass = new ResetPasswordForm();

  public resetPassForm: FormGroup;

  private PutOK:any  = null;
  private PutError:any  = null;
  private urlTree:any  = null;
  private token:any  = null;

  constructor(
    public  gral:   AppUIUtilsService,
    private auth:   AuthService,
    private user:   UsuarioService,
    public  config: ConfigService,
    private formBuilder: FormBuilder,
    private validator: ValidatorService,
    private router: Router,
  ) {
    
    this.urlTree = this.router.parseUrl(this.router.url);

    this.token = this.urlTree.queryParams['token'];
   }

  ngOnInit() {
    this.resetPassForm = this.formBuilder.group({
      new_password: ['', Validators.required],
      repeat_password: ['', Validators.required],
    },{
      validators: (control) => {
        if (control.value.new_password !== control.value.repeat_password) {
          control.get("repeat_password").setErrors({ notSame: true });
        }
        return null;
      },
    });
  }

  next(){
    if(this.resetPassForm.valid){
      this.user.resetPassword( this.resetPass, this.token);

      this.PutOK = this.user.resetPasswordOK.subscribe({  next: ( params: any ) => {
      this.gral.dismissLoading();
      this.gral.showMessage('Datos actualizados');
      this.user.goToLogin();
      } });

      this.PutError = this.user.resetPasswordError.subscribe({  next: ( params: any ) => {
      this.gral.dismissLoading();
      this.gral.showMessage('Ocurrió un error, reintente más tarde.');
      } });
    
    }
 }

}
