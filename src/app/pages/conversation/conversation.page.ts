import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppUIUtilsService } from '../../services/app.ui.utils.service';
import { AuthService }       from '../../services/auth/auth.service';
import { MessageService }    from '../../services/message.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {

  public contactInfo: any = {
    name: 'JOHN DOE',
    status: 'ONLINE',
    img: 'https://ui-avatars.com/api/?name=John+Doe'
  }
  public showOptions: boolean = false;
  public messages: Array<any> = [
    { text: "Hola, coma andas?", type: 'received', created: '14:02' },
    { text: "Bien", type: 'send', created: '14:05' },
    { text: "Te gustaría salir al cine hoy?", type: 'send', created: '14:05' },
    { text: "Uhh, no hoy no puedo", type: 'received', created: '14:15' },
    { text: "Pero mañana podría ser?", type: 'received', created: '14:16' },
    { text: "borrado", type: 'received', created: '14:05' },
    { text: "borrado", type: 'received', created: '14:05' },
    { text: "borrado", type: 'received', created: '14:05' },
    { text: "borrado", type: 'received', created: '14:05' },
    { text: "Perdón mande esas fotos sin querer", type: 'received', created: '14:15' },
    { text: "ahh, ok", type: 'send', created: '14:16' },
  ];


  constructor(
    private authService:       AuthService,
    private messageService:    MessageService,
    private appUIUtilsService: AppUIUtilsService,
    private activatedRoute:    ActivatedRoute
  ) { }

  private activatedRouteSubject:any = null;
  ngOnInit() {
    this.activatedRouteSubject = this.activatedRoute.params.subscribe((params: any) => {
        this.appUIUtilsService.presentLoading();
        console.log(params);
        this.messageService.getAll( 'filter[chat_id]=' );
    });

    this.setRequestsSubscriptions();
  }

  private getAllOK:any    = null;
  private getAllError:any = null;
  setRequestsSubscriptions(){

  }

  showOptionsToggle(value?: boolean) {
    if (value !== undefined) {
      this.showOptions = value;
      return;
    }
    this.showOptions = !this.showOptions;
  }

  showContactProfile(){

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
