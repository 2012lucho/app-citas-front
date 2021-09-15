import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConfigService {

  constructor(
  ) {}

  public getConfigData(){
    return {
      apiBaseUrl:"https://citas.api.greenborn.com.ar/",
      loginAction:"login",
      chatRoomAction:"chat-rooms",
      messageAction:"messages",
      genderAction:"genders",
      matchesAction:"matches",
      profileAction:"profiles",
      profileImageAction:"profile-images",
      changePasswordAction:"change-password",
      userAction:"users",
      registerAction:"registers",
      resendVerificationEmailAction: "resend-email-verification",
      verificationEmailAction: "confirm-emails",
      resetPasswordEmailAction:"password-reset",
      resetPasswordAction:"change-password-token",
      searchProfiles:"search-profiles",
      appName: "app_citas_dev_"
    };
  }

}
