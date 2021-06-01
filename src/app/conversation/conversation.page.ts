import { Component, OnInit } from '@angular/core';

import { AuthService }     from '../services/auth/auth.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {

  public contactInfo: any = {
    name: 'JOHN DOE',
    status: 'ONLINE'
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
    private authService: AuthService
  ) { }

  ngOnInit() {
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

}
