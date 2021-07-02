import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController }  from '@ionic/angular';

import { AppUIUtilsService } from '../../services/app.ui.utils.service';
import { AuthService }       from '../../services/auth/auth.service';
import { MessageService }    from '../../services/message.service';
import { ProfileService }    from '../../services/profile.service';

import { Message }    from '../../models/message';
import { ContactInfo } from '../../models/contact.info.model';
@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {

  public contactInfo: ContactInfo = new ContactInfo();
  public showOptions: boolean = false;
  public messages: Array<Message> = [];

  constructor(
    private authService:       AuthService,
    private messageService:    MessageService,
    private appUIUtilsService: AppUIUtilsService,
    private activatedRoute:    ActivatedRoute,
    private navController:     NavController,
    private profileService:    ProfileService
  ) { }

  private activatedRouteSubject:any = null;
  private userId:number             = -1;
  ngOnInit() {
    this.activatedRouteSubject = this.activatedRoute.params.subscribe((params: any) => {
        this.appUIUtilsService.presentLoading();
        this.userId      = this.authService.getUserId();
        this.contactInfo = this.messageService.getContactInfo();
        this.messageService.getAll( 'filter[chat_id]='+this.messageService.getChatId() );
    });

    this.setRequestsSubscriptions();
  }

  private getAllOK:any    = null;
  private getAllError:any = null;
  setRequestsSubscriptions(){
    this.getAllOK = this.messageService.getAllOK.subscribe({  next: ( response: any ) => {
        this.appUIUtilsService.dismissLoading();
        this.messages = [];
        for (let c=0; c < response.items.length;c++){
          let msg:Message = new Message();
          if (this.userId == response.items[c].user_sender_id){
            msg.type = 'send';
          } else {
            msg.type = 'received';
          }
          msg.message      = response.items[c].message;
          msg.id           = response.items[c].id;
          this.messages.push( msg );
        }
    } });

    this.getAllError = this.messageService.getAllError.subscribe({  next: ( params: any ) => {
        this.appUIUtilsService.dismissLoading();
        this.appUIUtilsService.showMessage('Ocurrió un error, reintente más tarde.');
    } });
  }

  showOptionsToggle(value?: boolean) {
    if (value !== undefined) {
      this.showOptions = value;
      return;
    }
    this.showOptions = !this.showOptions;
  }

  showContactProfile( contactInfo:ContactInfo ){
    this.profileService.setContactInfo( contactInfo );
    this.navController.navigateForward('tabs/tabs/user-description');
  }

  unSetRequestsSubscriptions(){
    this.getAllOK.unsubscribe();
    this.getAllError.unsubscribe();
  }

  ngOnDestroy(){
    this.activatedRouteSubject.unsubscribe();
    this.unSetRequestsSubscriptions();
  }

}
