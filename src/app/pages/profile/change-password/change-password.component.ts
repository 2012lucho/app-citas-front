import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangePassword } from 'src/app/models/change-password';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ConfigService } from 'src/app/services/config.service';
import { AppUIUtilsService } from 'src/app/services/app.ui.utils.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ValidatorService } from 'src/app/services/validator.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {

  public changePass = new ChangePassword();

  public changePassForm: FormGroup;

  private PutOK:any  = null;
  private PutError:any  = null;

  constructor(
    public  gral:   AppUIUtilsService,
    private auth:   AuthService,
    private user:   UsuarioService,
    public  config: ConfigService,
    private formBuilder: FormBuilder,
    private validator: ValidatorService,
    private router: Router,
  ) { }

  ngOnInit() {
   if ( !(this.auth.logedIn()) ){
      this.router.navigate(['/']);
    } 
    this.changePassForm = this.formBuilder.group({
      old_password: ['', Validators.required],
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
    if(this.changePassForm.valid){
      this.user.changePassword( this.changePass);

      this.PutOK = this.user.changePasswordOK.subscribe({  next: ( params: any ) => {
      this.gral.dismissLoading();
      this.gral.showMessage('Datos actualizados');
      this.user.goToProfile();
      } });

      this.PutError = this.user.changePasswordError.subscribe({  next: ( params: any ) => {
      this.gral.dismissLoading();
      this.gral.showMessage('Ocurrió un error, reintente más tarde.');
      } });
    
    }
 }

}
