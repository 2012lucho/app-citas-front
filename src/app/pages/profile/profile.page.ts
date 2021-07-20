import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';

import { AuthService }       from '../../services/auth/auth.service';
import { ProfileService }    from '../../services/profile.service';
import { AppUIUtilsService } from '../../services/app.ui.utils.service';
import { UserService }       from '../../services/user.service';

import { Profile } from '../../models/profile';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {

  public expandable_items:any = {
    cuenta:         { expanded:true },
    notificaciones: { expanded:false },
    invitar:        { expanded:false },
    ayuda:          { expanded:false }
  };

  private getProfile:any = null;
  private getProfileError:any = null;

  public profile:Profile  = new Profile();
  public user_name:string = '';

  constructor(
    private authService:       AuthService,
    private profileService:    ProfileService,
    private activatedRoute:    ActivatedRoute,
    private appUIUtilsService: AppUIUtilsService,
    private userService:       UserService
  ) {}

  private activatedRouteSubject:any = null;
  ngOnInit(): void {
    this.activatedRouteSubject = this.activatedRoute.params.subscribe((params: any) => {
        this.appUIUtilsService.presentLoading();
        this.profileService.get( this.authService.getUserId(), '?expand=profileImages' );
    });

    this.setRequestsSubscriptions();
  }

  setRequestsSubscriptions(){
    ////  PROFILE
    //GET
    this.getProfile = this.profileService.getOK.subscribe({  next: ( params: any ) => {
        this.appUIUtilsService.dismissLoading();
        this.setProfileData(params);
    } });

    this.getProfileError = this.profileService.getError.subscribe({  next: ( params: any ) => {
        this.appUIUtilsService.dismissLoading();
        this.appUIUtilsService.showMessage('Ocurrió un error, reintente más tarde.');
    } });

    //// USER
    this.onlineStatusChangeOK = this.userService.onlineStatusChangeOK.subscribe({  next: ( params: any ) => {
        this.appUIUtilsService.dismissLoading();
    } });

    this.onlineStatusChangeError = this.userService.onlineStatusChangeError.subscribe({  next: ( params: any ) => {
        this.appUIUtilsService.dismissLoading();
        this.appUIUtilsService.showMessage('Ocurrió un error, reintente más tarde.');
    } });
  }

  unSetRequestsSubscriptions(){
    this.getProfile.unsubscribe();
    this.getProfileError.unsubscribe();
  }

  setProfileData( params:any ){
    this.profile   = params;
    this.user_name = this.authService.getUserName();
  }

  toggleExpanded( k:string ){
    this.expandable_items[ k ].expanded = !this.expandable_items[ k ].expanded;
  }

  logOut(){
    this.userService.setOnlineStatus( false );
    this.authService.toLogOut();
  }

  public user_online:boolean = true;
  private onlineStatusChangeOK:any    = null;
  private onlineStatusChangeError:any = null;
  userOnlineChange(){
    this.userService.setOnlineStatus( !this.user_online );
  }

  ngOnDestroy(){
    this.activatedRouteSubject.unsubscribe();
    this.onlineStatusChangeOK.unsubscribe();
    this.onlineStatusChangeError.unsubscribe();
    this.unSetRequestsSubscriptions();
  }

  edit(){
    this.profileService.goToEdit(this.profile);
  }

}
