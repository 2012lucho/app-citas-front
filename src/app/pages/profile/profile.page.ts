import { Component, OnInit } from '@angular/core';

import { AuthService }     from '../../services/auth/auth.service';
import { ProfileService }  from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {

  public expandable_items:any = {
    cuenta:         { expanded:true },
    notificaciones: { expanded:false },
    invitar:        { expanded:false },
    ayuda:          { expanded:false }
  };

  constructor(
    private authService:    AuthService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
  }

  toggleExpanded( k:string ){
    this.expandable_items[ k ].expanded = !this.expandable_items[ k ].expanded;
  }
}
