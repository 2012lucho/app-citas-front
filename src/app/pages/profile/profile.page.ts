import { Component, OnInit } from '@angular/core';

import { AuthService }     from '../../services/auth/auth.service';
import { ProfileService }  from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {
public item:any = {expanded:true};
  constructor(
    private authService:    AuthService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
  }
}
