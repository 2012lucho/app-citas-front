import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfileEditComponent } from './profile-edit.component';
import { ComponentsModule }     from '../../../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: ProfileEditComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProfileEditComponent]
})
export class ProfileEditModule {}
