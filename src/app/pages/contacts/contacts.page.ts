import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { AuthService }       from '../../services/auth/auth.service';
import { MatchesService }    from '../../services/matches.service';
import { AppUIUtilsService } from '../../services/app.ui.utils.service';

import { ContactInfo } from './contact.info.model';

@Component({
  selector: 'app-contacts',
  templateUrl: 'contacts.page.html',
  styleUrls: ['contacts.page.scss']
})
export class ContactsPage {

  public contactsList: Array<ContactInfo> = [];

  constructor(
    private navCtrl:           NavController,
    private authService:       AuthService,
    private matchesService:    MatchesService,
    private appUIUtilsService: AppUIUtilsService,
    private activatedRoute:    ActivatedRoute
  ) {}

  private showConversationPage() {
    this.navCtrl.navigateForward('conversation')
  }

  private activatedRouteSubject:any = null;
  ngOnInit(): void {
    this.activatedRouteSubject = this.activatedRoute.params.subscribe((params: any) => {
        this.appUIUtilsService.presentLoading();
        this.matchesService.getByUser( this.authService.getUserId() );
    });

    this.setRequestsSubscriptions();
  }

  private getMatchesByUser:any      = null;
  private getMatchesByUserError:any = null;
  setRequestsSubscriptions(){
    //GET
    this.getMatchesByUser = this.matchesService.getMatchesByUser.subscribe({  next: ( params: any ) => {
        this.appUIUtilsService.dismissLoading();
        console.log(2);
    } });

    this.getMatchesByUserError = this.matchesService.getMatchesByUserError.subscribe({  next: ( params: any ) => {
        this.appUIUtilsService.dismissLoading();
        this.appUIUtilsService.showMessage('Ocurrió un error, reintente más tarde.');
    } });
  }

  unSetRequestsSubscriptions(){
    this.getMatchesByUser.unsubscribe();
    this.getMatchesByUserError.unsubscribe();
  }

  ngOnDestroy(){
    this.activatedRouteSubject.unsubscribe();
    this.unSetRequestsSubscriptions();
  }
}
