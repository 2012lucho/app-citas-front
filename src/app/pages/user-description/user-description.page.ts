import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';

import { AuthService }       from '../../services/auth/auth.service';
import { ProfileService }    from '../../services/profile.service';
import { AppUIUtilsService } from '../../services/app.ui.utils.service';

import { Profile } from '../../models/profile';
import { ContactInfo } from '../../models/contact.info.model';

@Component({
  selector: 'app-user-description',
  templateUrl: 'user-description.page.html',
  styleUrls: ['user-description.page.scss']
})
export class UserDescriptionPage {

  public contactInfo:ContactInfo = new ContactInfo();

  constructor(
    private authService:       AuthService,
    private profileService:    ProfileService,
    private activatedRoute:    ActivatedRoute,
    private appUIUtilsService: AppUIUtilsService
  ) {}

  private activatedRouteSubject:any = null;
  ngOnInit(): void {
    this.activatedRouteSubject = this.activatedRoute.params.subscribe((params: any) => {
        this.contactInfo = this.profileService.getContactInfo();
        console.log(this.contactInfo);
    });

    this.setRequestsSubscriptions();
  }

  setRequestsSubscriptions(){

  }

  unSetRequestsSubscriptions(){

  }

  ngOnDestroy(){
    this.activatedRouteSubject.unsubscribe();
    this.unSetRequestsSubscriptions();
  }
}
