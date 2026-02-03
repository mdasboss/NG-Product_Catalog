import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignuComponent } from './pages/signu/signu.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from '../../core/gurards/auth.guard';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'signup',component:SignuComponent},
  {path:'profile', component:ProfileComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
