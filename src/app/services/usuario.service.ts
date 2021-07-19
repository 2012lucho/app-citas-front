import { Injectable      } from '@angular/core';
import { Subject}         from 'rxjs'; //**librería de Javascript para gestionar secuencias de eventos.  */
import { Router }          from '@angular/router';
import { Usuario } from '../models/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { AppUIUtilsService } from './app.ui.utils.service';
import { AuthService }     from './auth/auth.service';
import { ChangePassword } from '../models/change-password';
import { ResetPasswordForm } from '../models/reset-password-form';
import { ResetPassword } from '../models/reset-password';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  updateTableSubject: any;

  constructor(
    private router:        Router,
    private config: ConfigService,
    private http:          HttpClient,
    private authService:   AuthService,
    private gralService: AppUIUtilsService
  ) {
    this.configData = this.config.getConfigData();
  }

  private configData:any = {};
  private mainAction:string = 'usersAction';
  private profileAction:string = 'profileAction';
  private imageAction:string = 'imageAction';

  public getAllOK:Subject<any>           = new Subject();
  public getAllError:Subject<any>           = new Subject();

  private LastElement:any = {};

  public getAllRolesOK:Subject<any> = new Subject();
  getRoles(){
    let roleData:any = {
      items:[
        { id:1, name: 'Administrador' },
        { id:2, name: 'Usuario Final' }
      ]
    };
    this.getAllRolesOK.next( roleData );
  }

  public getALLRolesToTF:Subject<any> = new Subject();
  getAllRolestoTableFilter(){
    let subscribeGetAll:any = this.getAllRolesOK.subscribe({  next: ( data : any) => {
        this.getALLRolesToTF.next( this.formatToSelectArray( data, 'name' ) );
        subscribeGetAll.unsubscribe();
    } });

    this.getRoles();
  }

  public getAllGendersOK:Subject<any> = new Subject();
  public getAllGendersError:Subject<any> = new Subject();
  getGenders(){
    let genderData:any = {
      items:[
        { id:1, name: 'Hombre' },
        { id:2, name: 'Mujer' },
        {id:3, name: 'No Binario'}
      ]
    };
    this.getAllGendersOK.next( genderData );
  }

  public getALLGendersToTF:Subject<any> = new Subject();
  getAllGenderstoTableFilter(){
    let subscribeGetAll:any = this.getAllGendersOK.subscribe({  next: ( data : any) => {
        this.getALLGendersToTF.next( this.formatToSelectArray( data, 'type' ) );
        subscribeGetAll.unsubscribe();
    } });

    this.getGenders();
  }

  public getAllStatesOK:Subject<any> = new Subject();
  public getAllStatesError:Subject<any> = new Subject();
  getStates(){
    let stateData:any = {
      items:[
        { id:0, name: 'Usuario Baneado' },
        { id:1, name: 'Usuario NO Baneado' },
      ]
    };
    this.getAllStatesOK.next( stateData );
  }

  public getALLStatesToTF:Subject<any> = new Subject();
  getAllStatesstoTableFilter(){
    let subscribeGetAll:any = this.getAllStatesOK.subscribe({  next: ( data : any) => {
        this.getALLStatesToTF.next( this.formatToSelectArray( data, 'type' ) );
        subscribeGetAll.unsubscribe();
    } });

    this.getStates();
  }


  //formateamos la info a un formato comun para selects
  private formatToSelectArray( data:any, fieldDescription:string = 'description' ){
    let out:any = [];
    for ( let c=0; c < data[ 'items' ].length; c++ ){
      out.push( { id:data[ 'items' ][ c ].id, description: data[ 'items' ][ c ][ fieldDescription ] } );
    }
    return out;
  }

  getAll( params:any = ''){
    this.http.get( this.configData['apiBaseUrl'] + this.configData[ this.mainAction ] + '?' + params,
      { headers: new HttpHeaders({ 'Content-Type':  'application/json', 'Authorization':'Bearer ' + this.authService.getToken() }) }).subscribe(
        data => {
            this.LastElement = data;
            this.getAllOK.next(data);
        },
        err =>  {
            this.gralService.dismissLoading();
            this.getAllError.next(err);
        }
      );
  } 

  public getOK:Subject<any>           = new Subject();
  public getError:Subject<any>           = new Subject();
  get( id:number ){
    let user_data:any = {};
    let prof_data:any = {};
    let out:any = {};
    this.http.get( this.configData['apiBaseUrl'] + this.configData[ this.mainAction ]+'/'+id,
      { headers: new HttpHeaders({ 'Content-Type':  'application/json', 'Authorization':'Bearer ' + this.authService.getToken() }) }).subscribe(
      usr_data => {
          user_data = usr_data;

          this.http.get( this.configData['apiBaseUrl'] + this.configData[ this.profileAction ]+'/'+user_data["profile_id"] ,
            { headers: new HttpHeaders({ 'Content-Type':  'application/json', 'Authorization':'Bearer ' + this.authService.getToken() }) }).subscribe(
            prof_data => {
                  out = Object.assign({}, user_data, prof_data);
                  this.LastElement = out;
                  this.getOK.next(out);
            },
            err =>  {
                this.gralService.dismissLoading();
                this.getError.next(err);
            }
          );
      },
      err =>  {
          this.gralService.dismissLoading();
          this.getError.next(err);
      });
  }

  getDataFBootstrapForm( params:any ){
    let out:any = [{ value: '', text:'-' }];
    for (let c = 0; c < params.items.length; c++){
      out.push({ value: params.items[c].id, text:params.items[c].name });
    }
    return out;
  }

  public goToCreateSubj:Subject<any> = new Subject();
  goToCreate(){
    this.router.navigate( [ '/users' ] );
    this.goToCreateSubj.next(true);
  }

  public PostOK:Subject<any> = new Subject();
  public PostError:Subject<any> = new Subject();
  post( model:Usuario){
    this.http.post( this.configData['apiBaseUrl'] + this.configData[ this.mainAction ], model ,
      { headers: new HttpHeaders({ 'Content-Type':  'application/json', 'Authorization':'Bearer ' + this.authService.getToken() }) }).subscribe(
        data => {
            this.updateImage( data["profile"], model.image_src);
            this.LastElement = data;
            this.PostOK.next(data);
        },
        err =>  {
            this.gralService.dismissLoading();
            this.PostError.next(err);
        }
      );
  }

  public goToEditSubj:Subject<any> = new Subject();
  goToEdit( id:any ){
    this.router.navigate( [ '/users' ] );
    this.goToEditSubj.next( id );
  }

  public PutOK:Subject<any> = new Subject();
  public PutError:Subject<any> = new Subject();
  put( model:Usuario ){
    this.http.put( this.configData['apiBaseUrl'] + this.configData[ this.mainAction ]+'/'+model.id, model,
      { headers: new HttpHeaders({ 'Content-Type':  'application/json', 'Authorization':'Bearer ' + this.authService.getToken() }) }).subscribe(
        data => {
            if(model.image_src != null)
                this.updateImage( data["profile"], model.image_src);
            this.LastElement = data;
            this.PutOK.next(data);
        },
        err =>  {
            this.gralService.dismissLoading();
            this.PutError.next(err);
        }
      );
  }

  public goToUsersSubj:Subject<any> = new Subject();
  goToABM(){
    this.router.navigate( [ '/users', { subPage:'users' } ] );
    this.goToUsersSubj.next(true);
  }

  public goToAdminSubj:Subject<any> = new Subject();
  goToAdmin(){
    this.router.navigate( [ '/administracion' ] );
    this.goToAdminSubj.next(true);
  }

  public goToProfileSubj:Subject<any> = new Subject();
  goToProfile(){
    this.router.navigate( [ '/tabs/tabs/profile' ] );
    this.goToProfileSubj.next(true);
  }

  public goToLoginSubj:Subject<any> = new Subject();
  goToLogin(){
    this.router.navigate( [ '/login' ] );
    this.goToLoginSubj.next(true);
  }

  public goToBaneoSubj:Subject<any> = new Subject();
  goToBaneo( id:any ){
    this.router.navigate( [ '/users' ] );
    this.goToBaneoSubj.next( id );
  }

  public baneoOK:Subject<any> = new Subject();
  public baneoError:Subject<any> = new Subject();
  baneo( model: Usuario){
    this.http.put( this.configData['apiBaseUrl'] + this.configData[ this.mainAction ]+'/'+model.id, model ,
      { headers: new HttpHeaders({ 'Content-Type':  'application/json', 'Authorization':'Bearer ' + this.authService.getToken() }) }).subscribe(
        data => {
            this.LastElement = data;
            this.baneoOK.next(data);
        },
        err =>  {
            this.baneoError.next(err);
        }
      );
  }

  public UpdateImageOK:Subject<any> = new Subject();
  public UpdateImageError:Subject<any> = new Subject();
  updateImage( id: number, image_src: String){
    this.http.post( this.configData['apiBaseUrl'] + this.configData[ this.imageAction ], {profile_id: id, path: image_src} ,
      { headers: new HttpHeaders({ 'Content-Type':  'application/json', 'Authorization':'Bearer ' + this.authService.getToken() }) }).subscribe(
        data => {
            this.LastElement = data;
            this.updateImageId(id, data["id"]);
            this.UpdateImageOK.next(data);
        },
        err =>  {
            this.gralService.dismissLoading();
            this.UpdateImageError.next(err);
        }
      );
  }

  public getImageOK:Subject<any> = new Subject();
  public getImageError:Subject<any> = new Subject();
  getImage( id: number){
    this.http.get( this.configData['apiBaseUrl'] + this.configData[ this.imageAction ]+'/'+id,
      { headers: new HttpHeaders({ 'Content-Type':  'application/json', 'Authorization':'Bearer ' + this.authService.getToken() }) }).subscribe(
        data => {
          this.LastElement = data;
          this.getImageOK.next(data);
        },
        err =>  {
            this.gralService.dismissLoading();
            this.getImageError.next(err);
        }
      );
  }

  public updateImageIdOK:Subject<any> = new Subject();
  public updateImageIdError:Subject<any> = new Subject();
  updateImageId( id : number, image_id: number){
    this.http.put( this.configData['apiBaseUrl'] + this.configData[ this.mainAction ]+'/'+id, {default_profile_image_id: image_id} ,
      { headers: new HttpHeaders({ 'Content-Type':  'application/json', 'Authorization':'Bearer ' + this.authService.getToken() }) }).subscribe(
        data => {
          this.LastElement = data;
          this.updateImageIdOK.next(data);
        },
        err =>  {
            this.updateImageIdError.next(err);
        }
      );
  }

  public changePasswordOK:Subject<any> = new Subject();
  public changePasswordError:Subject<any> = new Subject();
  changePassword( model:ChangePassword ){
    if(this.authService.logedIn){
      this.http.put(this.configData['apiBaseUrl'] + this.configData['changePasswordAction']+'/'+this.authService.getUserId(), model,
      { headers: new HttpHeaders({ 'Content-Type':  'application/json', 'Authorization':'Bearer ' + this.authService.getToken() }) }).subscribe(
        data => {
          this.LastElement = data;
          this.changePasswordOK.next(data);
        },
        err =>  {
          this.changePasswordError.next(err);
        }
      );
    }
  }

  public resetPasswordOK:Subject<any> = new Subject();
  public resetPasswordError:Subject<any> = new Subject();
  resetPassword( model:ResetPasswordForm){
    this.http.put(this.configData['apiBaseUrl'] + this.configData['resetPasswordAction']+'/'+model.id, model,
    { headers: new HttpHeaders({ 'Content-Type':  'application/json'}) }).subscribe(
        data => {
          this.LastElement = data;
          this.resetPasswordOK.next(data);
        },
        err =>  {
          this.resetPasswordError.next(err);
        }
      );
  }

}


