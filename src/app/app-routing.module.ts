import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthenticationGuard  } from './services/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule', canActivate: [AuthenticationGuard] },
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule', canActivate: [AuthenticationGuard] },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'enter-code', loadChildren: './pages/enter-code/enter-code.module#EnterCodePageModule', canActivate: [AuthenticationGuard] },
  { path: 'conversation', loadChildren: './pages/conversation/conversation.module#ConversationPageModule', canActivate: [AuthenticationGuard] },
  { path: 'change-password', loadChildren: './pages/profile/change-password/change-password.module#ChangePasswordModule', canActivate: [AuthenticationGuard] },
  { path: 'profile-edit', loadChildren: './pages/profile/profile-edit/profile-edit.module#ProfileEditModule', canActivate: [AuthenticationGuard] }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
