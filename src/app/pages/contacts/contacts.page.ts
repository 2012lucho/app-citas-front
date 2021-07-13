import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { AuthService }       from '../../services/auth/auth.service';
import { MatchesService }    from '../../services/matches.service';
import { AppUIUtilsService } from '../../services/app.ui.utils.service';
import { MessageService }    from '../../services/message.service';
import { ChatRoomService }   from '../../services/chat.room.service';

import { ContactInfo } from '../../models/contact.info.model';

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
    private activatedRoute:    ActivatedRoute,
    private messageService:    MessageService,
    private chatRoomService:   ChatRoomService
  ) {}

  private showConversationPage( id:number ) {
    this.appUIUtilsService.presentLoading();
    this.chatRoomService.getAll( 'filter[user_sender_id]='+id+'&expand=userReceiver,userSender.profile.defaultProfileImage' );
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
  private getChats:any              = null;
  private getChatsError:any         = null;
  setRequestsSubscriptions(){
    /// MATCHES
    //GET
    this.getMatchesByUser = this.matchesService.getMatchesByUser.subscribe({  next: ( response: any ) => {
        this.appUIUtilsService.dismissLoading();
        this.contactsList = [];
        for (let c=0; c < response.items.length;c++){
          let match:ContactInfo = new ContactInfo();
          match.name   = response.items[c].userMatched.username;
          match.online = response.items[c].userMatched.online;
          match.id     = response.items[c].userMatched.id;
          match.avatar = response.items[c].userMatched.profile.defaultProfileImage.path;
          this.contactsList.push( match );
        }
    } });

    this.getMatchesByUserError = this.matchesService.getMatchesByUserError.subscribe({  next: ( params: any ) => {
        this.appUIUtilsService.dismissLoading();
        this.appUIUtilsService.showMessage('Ocurrió un error, reintente más tarde.');
    } });

    ///CHATS
    //GET
    this.getChats = this.chatRoomService.getAllOK.subscribe({  next: ( response: any ) => {
        this.appUIUtilsService.dismissLoading();
        let contact:ContactInfo = new ContactInfo();
        contact.name   = response.items[0].userSender.username;
        contact.online = response.items[0].userSender.online;
        contact.id     = response.items[0].userSender.id;
        contact.avatar = response.items[0].userSender.profile.defaultProfileImage.path;
        contact.profile = response.items[0].userSender.profile;
        this.messageService.setContactInfo( contact );
        this.navCtrl.navigateForward('conversation');
    } });

    this.getChatsError = this.chatRoomService.getAllError.subscribe({  next: ( params: any ) => {
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
