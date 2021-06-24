import { Injectable      }         from '@angular/core';
import { Subject }                 from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ConfigService }          from './config.service';
import { AuthService }            from './auth/auth.service';

import { ChatRoom }  from '../models/chat.room';

@Injectable({ providedIn: 'root' })
export class ChatRoomService {

  constructor(
    private configService: ConfigService,
    private http:          HttpClient,
    private authService:   AuthService
  ) {
    this.configData = this.configService.getConfigData();
  }

  private configData:any = {};

  public getAllOK:Subject<any>           = new Subject();
  public getAllKO:Subject<any>           = new Subject();

  private LastElement:any = {};
  private mainAction:string = 'chatRoomAction';
  getAll( params:any = ''){
    this.http.get( this.configData['apiBaseUrl'] + this.configData[ this.mainAction ] + '?' + params,
      { headers: new HttpHeaders({ 'Content-Type':  'application/json', 'Authorization':'Bearer ' + this.authService.getToken() }) }).subscribe(
        data => {
            this.LastElement = data;
            this.getAllOK.next(data);
        },
        err =>  {
            this.getAllKO.next(err);
        }
      );
  }

  public getOK:Subject<any>           = new Subject();
  public getKO:Subject<any>           = new Subject();
  get( id:number ){
    this.http.get( this.configData['apiBaseUrl'] + this.configData[ this.mainAction ]+'/'+id,
      { headers: new HttpHeaders({ 'Content-Type':  'application/json', 'Authorization':'Bearer ' + this.authService.getToken() }) }).subscribe(
        data => {
            this.LastElement = data;
            this.getOK.next(data);
        },
        err =>  {
            this.getKO.next(err);
        }
      );
  }


  public getChatRoomsByUser:Subject<any>      = new Subject();
  public getChatRoomsByUserError:Subject<any> = new Subject();
  getByUser( id:number ){
    let params:string = '?filter[user_receiver_id]='+id+'&expand=userReceiver,userSender.profile.defaultProfileImage';
    this.http.get( this.configData['apiBaseUrl'] + this.configData[ this.mainAction ]+params,
      { headers: new HttpHeaders({ 'Content-Type':  'application/json', 'Authorization':'Bearer ' + this.authService.getToken() }) }).subscribe(
        data => {
            this.getChatRoomsByUser.next(data);
        },
        err =>  {
            this.getChatRoomsByUserError.next(err);
        }
      );
  }

  public PostOK:Subject<any> = new Subject();
  public PostKO:Subject<any> = new Subject();
  post( model:ChatRoom ){
    this.http.post( this.configData['apiBaseUrl'] + this.configData[ this.mainAction ], model,
      { headers: new HttpHeaders({ 'Content-Type':  'application/json', 'Authorization':'Bearer ' + this.authService.getToken() }) }).subscribe(
        data => {
            this.LastElement = data;
            this.PostOK.next(data);
        },
        err =>  {
            this.PostKO.next(err);
        }
      );
  }

  public PutOK:Subject<any> = new Subject();
  public PutKO:Subject<any> = new Subject();
  put( model:ChatRoom ){
    this.http.put( this.configData['apiBaseUrl'] + this.configData[ this.mainAction ]+'/'+model.id, model,
      { headers: new HttpHeaders({ 'Content-Type':  'application/json', 'Authorization':'Bearer ' + this.authService.getToken() }) }).subscribe(
        data => {
            this.LastElement = data;
            this.PutOK.next(data);
        },
        err =>  {
            this.PutKO.next(err);
        }
      );
  }

  public deleteOK:Subject<any> = new Subject();
  public deleteKO:Subject<any> = new Subject();
  delete( id:number ){
    this.http.delete( this.configData['apiBaseUrl'] + this.configData[ this.mainAction ]+'/'+id,
      { headers: new HttpHeaders({ 'Content-Type':  'application/json', 'Authorization':'Bearer ' + this.authService.getToken() }) }).subscribe(
        data => {
            this.deleteOK.next(data);
        },
        err =>  {
            this.deleteKO.next(err);
        }
      );
  }

}
