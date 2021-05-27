import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-contacts',
  templateUrl: 'contacts.page.html',
  styleUrls: ['contacts.page.scss']
})
export class ContactsPage {

  public contactsList: Array<any> = [
    { name: 'Bar', avatar: 'https://ui-avatars.com/api/?name=Bar', status: 'Idk' },
    { name: 'Dave', avatar: 'https://ui-avatars.com/api/?name=Dave', status: 'Life is good' },
    { name: 'Foo', avatar: 'https://ui-avatars.com/api/?name=Foo', status: 'Doing anything :D' },
    { name: 'John Doe', avatar: 'https://ui-avatars.com/api/?name=John+Doe', status: 'Nothing' },
  ];

  constructor(
    private navCtrl: NavController
  ) {}

  private showConversationPage() {
    this.navCtrl.navigateForward('conversation')
  }

}
