import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConfigService {

  constructor(
  ) {}

  public getConfigData(){
    return {
      apiBaseUrl:"https://app-citas-api.coodesoft.com.ar/web/",
      loginAction:"login",
      appName: "app_citas_dev_"
    };
  }

}
