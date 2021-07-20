import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConfigService {

  constructor(
  ) {}

  public getConfigData(){
    return {
      apiBaseUrl:"http://localhost/app-citas-back/web/",
      loginAction:"login",
      chatRoomAction:"chat-rooms",
      messageAction:"messages",
      genderAction:"genders",
      matchesAction:"matches",
      profileAction:"profiles",
      profileImageAction:"profile-images",
      changePasswordAction:"change-password",
      userAction:"users",
      appName: "app_citas_dev_"
    };
  }

}
