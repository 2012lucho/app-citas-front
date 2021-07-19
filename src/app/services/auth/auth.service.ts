import { Injectable }              from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router }                  from '@angular/router';

import { Login }  from '../../models/login';

import { ConfigService }   from '../config.service';
import { AppUIUtilsService }   from '../app.ui.utils.service';
import { ResetPassword } from 'src/app/models/reset-password';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private confGral:any = {};
  private LastElement:any = {};

  constructor(
    private  router:      Router,
    private  http:        HttpClient,
    private  config:      ConfigService,
    private  gral:        AppUIUtilsService
  ) {
    this.confGral = this.config.getConfigData();
  }

  login( model:Login ){
    this.gral.presentLoading();
    this.http.post(this.confGral['apiBaseUrl'] + this.confGral['loginAction'], model,
      { headers: new HttpHeaders({ 'Content-Type':  'application/json' }) }).subscribe(
        data => {
          this.gral.dismissLoading();

          if ( (data as any).status ){
            localStorage.setItem( this.confGral['appName']+'token',        (data as any).token );
            localStorage.setItem( this.confGral['appName']+'role',         (data as any).role );
            localStorage.setItem( this.confGral['appName']+'role_id',      (data as any).role_id );
            localStorage.setItem( this.confGral['appName']+'id',           (data as any).id );
            localStorage.setItem( this.confGral['appName']+'online',       (data as any).online );
            localStorage.setItem( this.confGral['appName']+'enterprise_id', JSON.stringify( (data as any).enterprise_id ) );
            localStorage.setItem( this.confGral['appName']+'logedIn',      JSON.stringify( (data as any).status ) );
            localStorage.setItem( this.confGral['appName']+'userName',     JSON.stringify( (data as any).username ) );
            this.router.navigate( ['/tabs/tabs/search'] );
          } else {
            this.gral.showMessage( 'Usuario o contraseña incorrecta.' );
          }
        },
        err =>  {
          this.gral.dismissLoading();
          localStorage.setItem( this.confGral['appName']+'logedIn',      JSON.stringify( false ) );
          localStorage.setItem( this.confGral['appName']+'token',        JSON.stringify( '' ) );
          localStorage.setItem( this.confGral['appName']+'enterprise_id', JSON.stringify('' ) );
          localStorage.setItem( this.confGral['appName']+'role',         '' );
          localStorage.setItem( this.confGral['appName']+'role_id',      '' );
          localStorage.setItem( this.confGral['appName']+'online',       JSON.stringify( false ));
          localStorage.setItem( this.confGral['appName']+'id',           JSON.stringify('' ) );
          localStorage.setItem( this.confGral['appName']+'userName',     JSON.stringify( '' ) );
          this.gral.showMessage( 'Ha ocurrido un error, por favor reintente más tarde.' );
        }
      );
  }

  toLoginIfNL(){
    if ( !this.logedIn() ){
      this.router.navigate(['/login']);
    } else {
      this.setMenuLinks();
    }
  }

  toLogOut(){
    localStorage.setItem( this.confGral['appName']+'logedIn',  JSON.stringify( false ) );
    localStorage.setItem( this.confGral['appName']+'token',    '' );
    this.router.navigate(['/login']);
  }

  logedIn(){
    let lgIn:any = localStorage.getItem( this.confGral['appName']+'logedIn' );
    if ( lgIn === undefined || lgIn === null ){
      return false;
    }
    return (lgIn === "true");
  }

  getToken(){
    return localStorage.getItem( this.confGral['appName']+'token' );
  }

  getUserName(){
    let out:any = localStorage.getItem( this.confGral['appName']+'userName' );
    //se eliminan las dos comillas
    out = out.replace('"','');
    out = out.replace('"','');
    out = out.replace(/\w\S*/g, (w:any) => (w.replace(/^\w/, (c:any) => c.toUpperCase())));
    return out;
  }

  getRole(){
    if ( !this.logedIn() ){
      return 'notassigned';
    }
    return localStorage.getItem( this.confGral['appName']+'role' );
  }

  getRoleId(){
    if ( !this.logedIn() ){
      return 'notassigned';
    }
    return localStorage.getItem( this.confGral['appName']+'role_id' );
  }

  getUserId(){
    return Number( localStorage.getItem( this.confGral['appName']+'id' ) );
  }

  setOnlineStatus( online:any ){
    localStorage.setItem( this.confGral['appName']+'online', online );
  }

  getOnlineStatus(){
    return localStorage.getItem( this.confGral['appName']+'online' );
  }

  setMenuLinks(){

  }

  public resetPasswordEmailOK:Subject<any> = new Subject();
  public resetPasswordEmailError:Subject<any> = new Subject();
  resetPasswordEmail( model:ResetPassword ){
    this.http.post(this.confGral['apiBaseUrl'] + this.confGral['resetPasswordEmailAction'], model,
      { headers: new HttpHeaders({ 'Content-Type':  'application/json'}) }).subscribe(
        data => {
          this.LastElement = data;
          this.resetPasswordEmailOK.next(data);
        },
        err =>  {
          this.resetPasswordEmailError.next(err);
        }
      );
  }
}
