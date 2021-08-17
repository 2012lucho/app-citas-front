import { Component } from '@angular/core';
import { NavController }  from '@ionic/angular';

import { MapSelectModelConfig } from 'src/app/components/map-select-point/model/map-select.model.config';

import { AuthService }     from 'src/app/services/auth/auth.service';
import { AppUIUtilsService } from 'src/app/services/app.ui.utils.service';
import { ProfileService }    from 'src/app/services/profile.service';

import { Profile }     from 'src/app/models/profile';
import { Search }      from 'src/app/models/search.model';
import { ContactInfo } from 'src/app/models/contact.info.model';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss']
})
export class SearchPage {

  constructor(
    private authService: AuthService,
    private appUIUtilsService: AppUIUtilsService,
    private navController:     NavController,
    private profileService: ProfileService
  ) {}

  public searchOptionsExpanded:Boolean = false;
  private position:any = { lat:0, lng:0 };

  public mapConfig:MapSelectModelConfig = new MapSelectModelConfig();
  private markerMove:any = null;

  private profilePutOK:any = null;
  private profilePutError:any = null;
  private profile:Profile = new Profile();
  private SearchOK:any = null;
  private SearchError:any = null;
  private getOK:any = null;
  private getError:any = null;
  public searchConfig:Search = new Search();
  private getProfile:string = 'initParams';

  public profiles:any = [];
  public contactInfo: ContactInfo = new ContactInfo();

  ngOnInit(): void {
    this.markerMove = this.mapConfig.markerMove.subscribe({  next: ( params: any ) => {
        this.position.lat = params.position.lat();
        this.position.lng = params.position.lng();
    } });
    this.setRequestSubscriptions();
    this.getProfile = 'initParams';
    this.profileService.get(this.authService.getProfileId());
  }

  searchProfile(){
    this.searchConfig.lat = this.position.lat;
    this.searchConfig.lng = this.position.lng;
    this.profileService.search( this.searchConfig );
  }

  setRequestSubscriptions(){
    ///// PROFILE
    this.profilePutOK = this.profileService.PutOK.subscribe({  next: ( params: any ) => {
       this.appUIUtilsService.dismissLoading();
       this.appUIUtilsService.showMessage('Datos actualizados');
       this.searchProfile();
    } });

    this.profilePutError = this.profileService.PutKO.subscribe({  next: ( params: any ) => {
       this.appUIUtilsService.dismissLoading();
       this.appUIUtilsService.showMessage('Ocurrió un error, reintente más tarde.');
    } });

    this.getOK = this.profileService.getOK.subscribe({  next: ( params: any ) => {
       this.appUIUtilsService.dismissLoading();

       if (this.getProfile == 'initParams'){
         this.mapConfig.setCords( params.lat, params.lng );
         this.searchProfile();
       } else {
         this.contactInfo = new ContactInfo();
         this.contactInfo.profile = params;
         this.profileService.setContactInfo( this.contactInfo );
         this.navController.navigateForward('tabs/tabs/user-description');
       }

    } });

    this.getError = this.profileService.getError.subscribe({  next: ( params: any ) => {
       this.appUIUtilsService.dismissLoading();
       this.appUIUtilsService.showMessage('Ocurrió un error, reintente más tarde.');
    } });

    //// Busqueda de perfiles
    this.SearchOK = this.profileService.SearchOK.subscribe({  next: ( params: any ) => {
       this.appUIUtilsService.dismissLoading();
       this.profiles = [];
       for ( let c=0; c < params.data.length; c++ ){
         let contact:ContactInfo = new ContactInfo();
         contact.id       = params.data[c].id;
         this.profiles[c] = { img: params.data[c].image_src, contactInfo:contact };
       }
    } });

    this.SearchError = this.profileService.SearchError.subscribe({  next: ( params: any ) => {
       this.appUIUtilsService.dismissLoading();
       this.appUIUtilsService.showMessage('Ocurrió un error, reintente más tarde.');
    } });
  }

  goToProfile( profile:ContactInfo ){
    this.getProfile = 'profileSelected';
    this.profileService.get(profile.id, '?expand=profileImages,gender,genderPreference');
  }

  clickToggleSerchOpts(){
    this.searchOptionsExpanded = !this.searchOptionsExpanded;
  }

  clickSavePosition(){
    this.appUIUtilsService.presentLoading();
    this.profile.id  = this.authService.getProfileId();
    this.profile.lng = this.position.lng;
    this.profile.lat = this.position.lat;
    delete this.profile.birth_date;
    delete this.profile.birth_date_string;
    delete this.profile.description;
    delete this.profile.email;
    delete this.profile.gender_id;
    delete this.profile.gender;
    delete this.profile.gender_preference_id;
    delete this.profile.genderPreference;
    delete this.profile.image_src;
    delete this.profile.profileImages;
    this.profileService.put( this.profile );
  }

  ngOnDestroy(){
    this.markerMove.unsubscribe();
    this.profilePutOK.unsubscribe();
    this.profilePutError.unsubscribe();
  }
}
