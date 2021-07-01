import { ProfileImage } from './profile.image';

export class Profile {
  public id:number                       = -1;
  public birth_date:any                  = null;
  public birth_string:string             = '';
  public description:string              = '';
  public email:string                    = '';
  public gender_id:number                = -1;
  public gender_string:string            = '';
  public gender_preference_id:number     = -1;
  public gender_preference_string:string = '';
  public image_src:string                = '';
  public profile_images:Array<ProfileImage> = [];
}
