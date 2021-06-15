import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { AuthService }     from '../../services/auth/auth.service';
import { ProfileService }  from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {

  constructor(
    private authService:    AuthService,
    private profileService: ProfileService,
    private router:         Router
  ) {}

  ngOnInit(): void {
    if ( !this.authService.logedIn() ){
      this.router.navigate(['/']);
    }
  }
}
