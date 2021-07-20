import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute }    from '@angular/router';
import { Router } from '@angular/router';

import { Profile } from 'src/app/models/profile';
import { Gender } from 'src/app/models/gender';
import { AppUIUtilsService } from 'src/app/services/app.ui.utils.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ConfigService } from 'src/app/services/config.service';
import { GenderService } from 'src/app/services/gender.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent implements OnInit {

  public profileForm: FormGroup;
  public profile = new Profile();
  public genders: Array<Gender> = null;

  private PutOK:any        = null;
  private PutError:any     = null;
  private goToEditSubj:any = null;

  constructor(
    public  gral:   AppUIUtilsService,
    private authService:   AuthService,
    private profileService:   ProfileService,
    private activatedRoute:   ActivatedRoute,
    private userService:   UsuarioService,
    private genderService:   GenderService,
    public  config: ConfigService,
    private formBuilder: FormBuilder,
  ) { }

  private activatedRouteSubject:any = null;
  ngOnInit() {
    this.activatedRouteSubject = this.activatedRoute.params.subscribe((params: any) => {
        this.profileForm = this.formBuilder.group({
          email: ['', Validators.required],
          birth_date: [''],
          description: [''],
          gender_id: [''],
          gender_preference_id: ['', Validators.required],
        }
        );
        this.goToEditSubj = this.profileService.goToEditSubj.subscribe({  next: ( params: any ) => {
          this.setProfileData(params);
          this.initValuesForm(this.profile);
        } });
        this.genderService.getAll();
        this.genderService.getAllOK.subscribe({  next: ( params: any ) => {
          this.setGenderData(params["items"]);
        } });
    });
  }

  next(){
    if(this.profileForm.valid){
      this.profileService.put(this.profile);
      this.PutOK = this.profileService.PutOK.subscribe({  next: ( params: any ) => {
         this.gral.dismissLoading();
         this.gral.showMessage('Datos actualizados');
         this.userService.goToProfile();
      } });

      this.PutError = this.profileService.PutKO.subscribe({  next: ( params: any ) => {
         this.gral.dismissLoading();
         this.gral.showMessage('Ocurrió un error, reintente más tarde.');
      } });

    }
  }

   initValuesForm(model: Profile){
    this.profileForm.patchValue({
      email: model.email,
      birth_date: model.birth_date,
      description: model.description,
      gender_id: model.gender_id,
      gender_preference_id: model.gender_preference_id,
    })
   }

    setProfileData( params:any ){
      this.profile   = params;
    }

    setGenderData( params:any ){
      this.genders   = params;
    }

    onChangeGender(id: number) {
      this.profile.gender_id = id;
    }

    onChangeGenderPreference(id: number) {
      this.profile.gender_preference_id = id;
    }

    unSetRequestsSubscriptions(){
      this.PutError.unsubscribe();
      this.PutOK.unsubscribe();
    }

    ngOnDestroy(){
      this.activatedRouteSubject.unsubscribe();
      this.unSetRequestsSubscriptions();
    }

}
