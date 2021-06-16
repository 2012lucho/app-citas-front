import { Component } from '@angular/core';

import { AuthService }     from '../../services/auth/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss']
})
export class SearchPage {

  constructor(
    private authService: AuthService
  ) {}

  public profiles:any = [
    { img:"https://griffonagedotcom.files.wordpress.com/2016/07/profile-modern-2e.jpg" },
    { img:"https://technoxyz.com/wp-content/uploads/2018/05/Stylish-WhatsApp-DP-Images-for-Boys-Cool-Profile-Pictures-2018-7.jpg" },
    { img:"https://technoxyz.com/wp-content/uploads/2018/05/Stylish-WhatsApp-DP-Images-for-Boys-Cool-Profile-Pictures-2018-12.jpg" },
    { img:"https://technoxyz.com/wp-content/uploads/2018/05/Best-Stylish-WhatsApp-DP-Images-for-Girls-Cool-Profile-Pictures-2018-13.jpg" },
    { img:"https://www.attractivepartners.co.uk/wp-content/uploads/2017/06/profile.jpg" },
    { img:"https://odesk-blog-content.s3.amazonaws.com/uploads/2014/10/01073435/profilephoto5.jpg" },
    { img:"https://www.mills.edu/uniquely-mills/students-faculty/student-profiles/images/student-profile-gabriela-mills-college.jpg" },
  ];

  gotToProfile( profile:any ){

  }
}
