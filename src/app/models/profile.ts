import { ProfileImage } from './profile.image';

export class Profile {
  public id:number                       = -1;
  public birth_date:any                  = null;
  public birth_string:string             = '';
  public description:string              = '';
  public email:string                    = '';
  public gender_id:number                = -1;
  public gender:any                      = { id:-1, type:'' };
  public gender_preference_id:number     = -1;
  public genderPreference:any            = { id:-1, type:'' };
  public image_src:string                = '';
  public profile_images:Array<ProfileImage> = [];
}
