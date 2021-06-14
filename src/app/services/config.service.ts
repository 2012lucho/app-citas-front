import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConfigService {

  constructor(
  ) {}

  public getConfigData(){
    return {
      apiBaseUrl:"http://app-citas-api.coodesoft.com.ar?r=",
      loginAction:"login",
      chatRoomAction:"chat-rooms",
      messageAction:"messages",
      genderAction:"genders",
      matchesAction:"matches",
      profileAction:"profiles",
      profileImageAction:"profileImages",
      appName: "app_citas_dev_"
    };
  }

}
