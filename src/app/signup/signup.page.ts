import { Component, OnInit } from '@angular/core';
import { countryCodes } from 'src/common/CountryCodes';
import { Platform, NavController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public countries: Array<any> = countryCodes;
  public confirmData: any = { code: '+1' }

  constructor(
    private platform: Platform,
    private navCtrl: NavController
  ) {
    
  }

  ngOnInit() {
  }

  showEnterCodePage ()
  {
    this.navCtrl.navigateRoot('enter-code')
  }

}
