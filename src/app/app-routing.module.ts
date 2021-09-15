import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthenticationGuard  } from './services/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'tabs', loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule), canActivate: [AuthenticationGuard] },
  { path: 'signup', loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule), canActivate: [AuthenticationGuard] },
  { path: 'profile-edit', loadChildren: () => import('./pages/profile/profile-edit/profile-edit.module').then(m => m.ProfileEditModule), canActivate: [AuthenticationGuard] },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  { path: 'enter-code', loadChildren: () => import('./pages/enter-code/enter-code.module').then(m => m.EnterCodePageModule), canActivate: [AuthenticationGuard] },
  { path: 'conversation', loadChildren: () => import('./pages/conversation/conversation.module').then(m => m.ConversationPageModule), canActivate: [AuthenticationGuard] },
  { path: 'change-password', loadChildren: () => import('./pages/profile/change-password/change-password.module').then(m => m.ChangePasswordModule), canActivate: [AuthenticationGuard] },
  { path: 'profile-edit', loadChildren: () => import('./pages/profile/profile-edit/profile-edit.module').then(m => m.ProfileEditModule), canActivate: [AuthenticationGuard] },
  { path: 'reset-password', loadChildren: () => import( './pages/login/reset-password/reset-password.module').then(m => m.ResetPasswordModule) },
  { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule) },
  { path: 'reset-password-token', loadChildren: () => import('./pages/login/reset-password-form/reset-password-form.module').then(m => m.ResetPasswordFormModule) },
  { path: 'verification-email', loadChildren: () => import('./pages/register/send-email/send-email.module').then(m => m.SendEmailModule), canActivate: [AuthenticationGuard] },
  { path: 'confirm-email', loadChildren: () => import('./pages/register/confirm-email/confirm-email.module').then(m => m.ConfirmEmailModule)}

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
