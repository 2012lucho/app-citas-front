import { Component } from '@angular/core';

import { AuthService }     from '../services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {

  constructor(
    private authService: AuthService
  ) {}

}
