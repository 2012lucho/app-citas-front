import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { AuthService }       from '../../services/auth/auth.service';
import { ChatRoomService }   from '../../services/chat.room.service';
import { AppUIUtilsService } from '../../services/app.ui.utils.service';

import { ChatList } from './chat.list.model';

@Component({
  selector: 'app-chats',
  templateUrl: 'chats.page.html',
  styleUrls: ['chats.page.scss']
})
export class ChatsPage {

  public chatList: Array<ChatList> = [];

  constructor(
    private navCtrl:           NavController,
    private authService:       AuthService,
    private chatRoomService:   ChatRoomService,
    private activatedRoute:    ActivatedRoute,
    private appUIUtilsService: AppUIUtilsService
  ) {}

  private showConversationPage ()
  {
    this.navCtrl.navigateForward('conversation')
  }

  private activatedRouteSubject:any = null;
  ngOnInit(): void {
    this.activatedRouteSubject = this.activatedRoute.params.subscribe((params: any) => {
        this.appUIUtilsService.presentLoading();
        this.chatRoomService.getByUser( this.authService.getUserId() );
    });

    this.setRequestsSubscriptions();
  }

  private getChatRoomsByUser:any      = null;
  private getChatRoomsByUserError:any = null;
  setRequestsSubscriptions(){
    //GET
    this.getChatRoomsByUser = this.chatRoomService.getChatRoomsByUser.subscribe({  next: ( response: any ) => {
        this.appUIUtilsService.dismissLoading();
        this.chatList = [];
        for (let c=0; c < response.items.length;c++){
          let chat:ChatList = new ChatList();
          chat.user         = { name: response.items[c].userSender.username, avatar:response.items[c].userSender.profile.defaultProfileImage.path };
          chat.message      = { snippet: '', created: '' }
          this.chatList.push( chat );
        }
    } });

    this.getChatRoomsByUserError = this.chatRoomService.getChatRoomsByUserError.subscribe({  next: ( params: any ) => {
        this.appUIUtilsService.dismissLoading();
        this.appUIUtilsService.showMessage('Ocurrió un error, reintente más tarde.');
    } });
  }

  unSetRequestsSubscriptions(){
    this.getChatRoomsByUser.unsubscribe();
    this.getChatRoomsByUserError.unsubscribe();
  }

  ngOnDestroy(){
    this.activatedRouteSubject.unsubscribe();
    this.unSetRequestsSubscriptions();
  }

}
