import { Profile } from './profile';

export class ContactInfo {
  public name:string       = '';
  public avatar:string     = '';
  public status_msg:string = '';
  public status:any        = null;
  public profile:Profile   = new Profile();
  public online:number     = -1;
  public id:number         = -1;
}
