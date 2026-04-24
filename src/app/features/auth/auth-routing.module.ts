import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignuComponent } from './pages/signu/signu.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from '../../core/gurards/auth.guard';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { userResolver } from './resolver/user.resolver';
import { editUserCanDeactivateGuard } from '../../core/gurards/edit-user-can-deactivate.guard';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'signup',component:SignuComponent},
  {path:'profile', component:ProfileComponent, canActivate:[AuthGuard]},
  {path:'edit-user/:id', component:EditUserComponent, canActivate:[AuthGuard],
    resolve: {
        user: userResolver
      },
      canDeactivate: [editUserCanDeactivateGuard]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
